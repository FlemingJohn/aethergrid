export interface TelemetryReading {
  deviceId: string;
  deviceAddress: string;
  nonce: number;
  cumulativeWattHours: number;
  currentKilowatts: number;
  temperatureCelsius: number;
  timestamp: number;
  signature: string;
}

