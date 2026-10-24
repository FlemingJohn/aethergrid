import time
import solcx
from web3 import Web3
from eth_account import Account
from eth_account.messages import encode_defunct

def compileContracts():
    solcx.set_solc_version("0.8.20")
    compiled = solcx.compile_files(
        [
            "d:/PortalDot/aethergrid/contracts/EnergyCreditToken.sol",
            "d:/PortalDot/aethergrid/contracts/EnergyRegistry.sol"
        ],
        output_values=["abi", "bin"]
    )
    for key in compiled.keys():
        if "EnergyCreditToken" in key:
            tokenArtifact = compiled[key]
        if "EnergyRegistry" in key:
            registryArtifact = compiled[key]
    return tokenArtifact, registryArtifact

def testSignatureVerification():
    print("Testing contract compilation and local verification...")
    tokenArtifact, registryArtifact = compileContracts()
    print("Compiled EnergyCreditToken and EnergyRegistry successfully!")

    w3 = Web3()
    deployer = Account.create()
    device = Account.create()

    nonce = 1
    cumulativeWattHours = 2500
    timestamp = int(time.time())

    payloadHash = Web3.solidity_keccak(
        ["address", "uint256", "uint256", "uint256"],
        [device.address, nonce, cumulativeWattHours, timestamp]
    )
    message = encode_defunct(payloadHash)
    signed = Account.sign_message(message, private_key=device.key)

    recovered = Account.recover_message(message, signature=signed.signature)
    assert recovered == device.address, "Recovered address mismatch"
    print(f"Cryptographic signature verified successfully for device {device.address[:10]}...!")
    print(f"Recovered signer matches device address: {recovered}")

if __name__ == "__main__":
    testSignatureVerification()
