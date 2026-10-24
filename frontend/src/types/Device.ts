export interface Device {
  id: string;
  name: string;
  deviceType: "solar" | "storage" | "microgrid";
  address: string;
  nominalKilowatts: number;
  currentKilowatts: number;
  batteryPercentage: number;
  temperatureCelsius: number;
  cumulativeWattHours: number;
  nonce: number;
  isOnline: boolean;
}

