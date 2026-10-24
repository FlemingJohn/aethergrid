// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IEnergyCreditToken {
    function mint(address recipient, uint256 amount) external returns (bool);
}

contract EnergyRegistry {
    struct Device {
        address ownerAddress;
        bool isActive;
        uint256 lastNonce;
        uint256 lastCumulativeWattHours;
        uint256 totalRecordedWattHours;
        uint256 lastReportTimestamp;
    }

    address public owner;
    IEnergyCreditToken public energyToken;

    mapping(address => Device) public devices;
    mapping(bytes32 => bool) public processedPayloadHashes;

    event DeviceRegistered(address indexed deviceAddress, address indexed ownerAddress);
    event DeviceStatusChanged(address indexed deviceAddress, bool isActive);
    event TelemetryVerified(
        address indexed deviceAddress,
        address indexed ownerAddress,
        uint256 nonce,
        uint256 deltaWattHours,
        uint256 cumulativeWattHours,
        uint256 mintedTokens
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor(address energyTokenAddress) {
        owner = msg.sender;
        energyToken = IEnergyCreditToken(energyTokenAddress);
    }

    function registerDevice(address deviceAddress, address ownerAddress) external onlyOwner {
        require(deviceAddress != address(0), "Invalid device");
        require(ownerAddress != address(0), "Invalid owner");
        require(!devices[deviceAddress].isActive, "Already registered");

        devices[deviceAddress] = Device({
            ownerAddress: ownerAddress,
            isActive: true,
            lastNonce: 0,
            lastCumulativeWattHours: 0,
            totalRecordedWattHours: 0,
            lastReportTimestamp: 0
        });

        emit DeviceRegistered(deviceAddress, ownerAddress);
    }

    function setDeviceStatus(address deviceAddress, bool isActive) external onlyOwner {
        require(devices[deviceAddress].ownerAddress != address(0), "Device not found");
        devices[deviceAddress].isActive = isActive;
        emit DeviceStatusChanged(deviceAddress, isActive);
    }

    function recordTelemetry(
        address deviceAddress,
        uint256 nonce,
        uint256 cumulativeWattHours,
        uint256 timestamp,
        bytes memory signature
    ) external returns (uint256) {
        Device storage device = devices[deviceAddress];
        require(device.isActive, "Device inactive or unregistered");
        require(nonce > device.lastNonce, "Stale nonce");
        require(cumulativeWattHours > device.lastCumulativeWattHours, "Non-monotonic cumulative reading");

        bytes32 messageHash = getTelemetryDigest(deviceAddress, nonce, cumulativeWattHours, timestamp);
        require(!processedPayloadHashes[messageHash], "Payload already processed");
        require(recoverSigner(messageHash, signature) == deviceAddress, "Invalid signature");

        uint256 deltaWattHours = cumulativeWattHours - device.lastCumulativeWattHours;
        device.lastNonce = nonce;
        device.lastCumulativeWattHours = cumulativeWattHours;
        device.totalRecordedWattHours += deltaWattHours;
        device.lastReportTimestamp = timestamp;
        processedPayloadHashes[messageHash] = true;

        uint256 tokensToMint = (deltaWattHours * 1e18) / 1000;
        if (tokensToMint > 0) {
            energyToken.mint(device.ownerAddress, tokensToMint);
        }

        emit TelemetryVerified(
            deviceAddress,
            device.ownerAddress,
            nonce,
            deltaWattHours,
            cumulativeWattHours,
            tokensToMint
        );

        return tokensToMint;
    }

    function getTelemetryDigest(
        address deviceAddress,
        uint256 nonce,
        uint256 cumulativeWattHours,
        uint256 timestamp
    ) public pure returns (bytes32) {
        bytes32 payloadHash = keccak256(
            abi.encodePacked(deviceAddress, nonce, cumulativeWattHours, timestamp)
        );
        return keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", payloadHash)
        );
    }

    function recoverSigner(bytes32 digest, bytes memory signature) public pure returns (address) {
        require(signature.length == 65, "Invalid signature length");
        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }
        if (v < 27) {
            v += 27;
        }
        return ecrecover(digest, v, r, s);
    }
}
