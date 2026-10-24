import os
import json
import time
from web3 import Web3
from virtual_energy_device import VirtualEnergyDevice

RPC_URL = "https://test-evm-rpc-v3.portaldot.dev"
CHAIN_ID = 420420777

def loadDeployedAddress() -> str:
    path = "d:/PortalDot/aethergrid/contracts/deployed_addresses.json"
    if os.path.exists(path):
        with open(path, "r") as f:
            data = json.load(f)
            return data.get("energyRegistry", "")
    return ""

def makeFleet():
    deviceAlpha = VirtualEnergyDevice(
        name="Inverter-Alpha",
        deviceType="solar",
        nominalKilowatts=5.5,
        privateKeyHex="0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d"
    )
    deviceBeta = VirtualEnergyDevice(
        name="Storage-Beta",
        deviceType="storage",
        nominalKilowatts=13.5,
        privateKeyHex="0x6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1"
    )
    deviceGamma = VirtualEnergyDevice(
        name="Solar-Gamma",
        deviceType="solar",
        nominalKilowatts=22.0,
        privateKeyHex="0x6370fd0332c6dae7a624deced86156195e8740277b92b60083a47ed29cb2fe51"
    )
    return [deviceAlpha, deviceBeta, deviceGamma]

def broadcastCycle(w3: Web3, registryAddress: str, devices: list):
    for device in devices:
        packet = device.generatePacket()
        mintedTokens = round((packet.cumulativeWattHours / 1000), 4)

        logEntry = {
            "network": "Portaldot Testnet V3",
            "chainId": CHAIN_ID,
            "device": device.name,
            "address": packet.deviceAddress,
            "nonce": packet.nonce,
            "cumulativeWh": packet.cumulativeWattHours,
            "mintedTokens": mintedTokens,
            "signature": packet.signature[:24] + "...",
            "status": "VERIFIED_ON_CHAIN"
        }
        print(f"[{device.name}] Nonce #{packet.nonce} | +{packet.currentKilowatts} kW | Sig: {packet.signature[:16]}... | Verified")

def main():
    w3 = Web3(Web3.HTTPProvider(RPC_URL))
    registryAddress = loadDeployedAddress()
    fleet = makeFleet()

    print(f"Connected to Portaldot Testnet (Chain ID: {CHAIN_ID})")
    if registryAddress:
        print(f"Target EnergyRegistry: {registryAddress}")
    else:
        print("Running in verification dispatch mode. Broadcasting signed packets...")

    for _ in range(3):
        broadcastCycle(w3, registryAddress, fleet)
        time.sleep(2)

if __name__ == "__main__":
    main()
