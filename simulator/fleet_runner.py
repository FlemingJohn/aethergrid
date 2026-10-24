import time
import json
from virtual_energy_device import VirtualEnergyDevice

def makeFleet() -> list[VirtualEnergyDevice]:
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

def runCycle(devices: list[VirtualEnergyDevice]) -> None:
    for device in devices:
        packet = device.generatePacket()
        packetSummary = {
            "device": device.name,
            "address": packet.deviceAddress,
            "nonce": packet.nonce,
            "powerKw": packet.currentKilowatts,
            "cumulativeWh": packet.cumulativeWattHours,
            "temperatureC": packet.temperatureCelsius,
            "timestamp": packet.timestamp,
            "signature": packet.signature[:18] + "..."
        }
        print(json.dumps(packetSummary))

def main() -> None:
    fleet = makeFleet()
    print("Fleet initialized with 3 devices. Broadcasting signed telemetry...")
    for _ in range(5):
        runCycle(fleet)
        time.sleep(2)

if __name__ == "__main__":
    main()

