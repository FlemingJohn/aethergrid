import time
import random
from telemetry_signer import TelemetrySigner
from telemetry_packet import TelemetryPacket

class VirtualEnergyDevice:
    def __init__(self, name: str, deviceType: str, nominalKilowatts: float, privateKeyHex: str):
        self.name = name
        self.deviceType = deviceType
        self.nominalKilowatts = nominalKilowatts
        self.signer = TelemetrySigner(privateKeyHex)
        self.nonce = 0
        self.cumulativeWattHours = 0
        self.batteryPercentage = 80.0
        self.temperatureCelsius = 25.0

    def generatePacket(self) -> TelemetryPacket:
        self.nonce += 1
        variance = random.uniform(0.85, 1.15)
        currentKilowatts = round(self.nominalKilowatts * variance, 2)
        addedWattHours = int((currentKilowatts * 1000) / 360)
        self.cumulativeWattHours += max(1, addedWattHours)

        self.updateBatteryAndTemperature(currentKilowatts)
        currentTimestamp = int(time.time())

        signature = self.signer.signReading(
            self.nonce,
            self.cumulativeWattHours,
            currentTimestamp
        )

        return TelemetryPacket(
            deviceAddress=self.signer.getAddress(),
            nonce=self.nonce,
            cumulativeWattHours=self.cumulativeWattHours,
            currentKilowatts=currentKilowatts,
            temperatureCelsius=round(self.temperatureCelsius, 1),
            timestamp=currentTimestamp,
            signature=signature
        )

    def updateBatteryAndTemperature(self, currentKilowatts: float) -> None:
        self.temperatureCelsius = 25.0 + (currentKilowatts * 2.5) + random.uniform(-0.5, 0.5)
        if self.deviceType == "storage":
            dischargeRate = random.uniform(0.1, 0.3)
            self.batteryPercentage = max(10.0, self.batteryPercentage - dischargeRate)

