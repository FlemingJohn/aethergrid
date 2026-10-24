from dataclasses import dataclass

@dataclass
class TelemetryPacket:
    deviceAddress: str
    nonce: int
    cumulativeWattHours: int
    currentKilowatts: float
    temperatureCelsius: float
    timestamp: int
    signature: str

