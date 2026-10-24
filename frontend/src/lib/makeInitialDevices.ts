import { Device } from "../types/Device";

export function makeInitialDevices(): Device[] {
  return [
    {
      id: "inverter-alpha",
      name: "Inverter-Alpha",
      deviceType: "solar",
      address: "0x4f3eDF983aC636A65A842Ce7C78d9Aa706D3b113",
      nominalKilowatts: 5.5,
      currentKilowatts: 5.34,
      batteryPercentage: 100,
      temperatureCelsius: 36.2,
      cumulativeWattHours: 14250,
      nonce: 48,
      isOnline: true
    },
    {
      id: "storage-beta",
      name: "Storage-Beta",
      deviceType: "storage",
      address: "0x6CbED15C793cE57650B9877Cf6fA156fbeF513C4",
      nominalKilowatts: 13.5,
      currentKilowatts: 12.8,
      batteryPercentage: 78.4,
      temperatureCelsius: 29.8,
      cumulativeWattHours: 38920,
      nonce: 112,
      isOnline: true
    },
    {
      id: "solar-gamma",
      name: "Solar-Gamma",
      deviceType: "solar",
      address: "0x6370Fd0332C6Dae7A624DeceD86156195E874027",
      nominalKilowatts: 22.0,
      currentKilowatts: 21.45,
      batteryPercentage: 100,
      temperatureCelsius: 41.5,
      cumulativeWattHours: 94100,
      nonce: 285,
      isOnline: true
    }
  ];
}

