import { useState, useEffect } from "react";
import { Device } from "../types/Device";
import { VerificationRecord } from "../types/VerificationRecord";
import { makeInitialDevices } from "../lib/makeInitialDevices";

export function useSimulation() {
  const [devices, setDevices] = useState<Device[]>(makeInitialDevices);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [attackMessage, setAttackMessage] = useState<string>("");
  const [records, setRecords] = useState<VerificationRecord[]>([
    {
      id: "tx-init-1",
      deviceName: "Inverter-Alpha",
      deviceAddress: "0x4f3eDF983aC636A65A842Ce7C78d9Aa706D3b113",
      nonce: 48,
      deltaWattHours: 148,
      cumulativeWattHours: 14250,
      mintedTokens: 0.148,
      transactionHash: "0x8fa9123bca087113e639ba472f1265819ad372e501bca9",
      timestamp: Date.now() - 60000,
      status: "verified"
    },
    {
      id: "tx-init-2",
      deviceName: "Storage-Beta",
      deviceAddress: "0x6CbED15C793cE57650B9877Cf6fA156fbeF513C4",
      nonce: 112,
      deltaWattHours: 355,
      cumulativeWattHours: 38920,
      mintedTokens: 0.355,
      transactionHash: "0x1bc45879ca0236fe8819ab3275914620fbe5847120ac8",
      timestamp: Date.now() - 30000,
      status: "verified"
    }
  ]);

  useEffect(() => {
    if (!isStreaming) {
      return;
    }
    const intervalHandle = setInterval(() => {
      advanceSimulation();
    }, 3200);
    return () => clearInterval(intervalHandle);
  }, [isStreaming]);

  function advanceSimulation() {
    setDevices((previousDevices) => {
      const targetIndex = Math.floor(Math.random() * previousDevices.length);
      const targetDevice = previousDevices[targetIndex];

      const variation = 0.9 + Math.random() * 0.2;
      const newKilowatts = Number((targetDevice.nominalKilowatts * variation).toFixed(2));
      const deltaWattHours = Math.max(15, Math.floor((newKilowatts * 1000) / 120));
      const newCumulative = targetDevice.cumulativeWattHours + deltaWattHours;
      const newNonce = targetDevice.nonce + 1;
      const mintedTokens = Number((deltaWattHours / 1000).toFixed(4));

      const updatedDevice: Device = {
        ...targetDevice,
        currentKilowatts: newKilowatts,
        cumulativeWattHours: newCumulative,
        nonce: newNonce
      };

      const newRecord: VerificationRecord = {
        id: `tx-${Date.now()}`,
        deviceName: targetDevice.name,
        deviceAddress: targetDevice.address,
        nonce: newNonce,
        deltaWattHours: deltaWattHours,
        cumulativeWattHours: newCumulative,
        mintedTokens: mintedTokens,
        transactionHash: makeRandomHash(),
        timestamp: Date.now(),
        status: "verified"
      };

      setRecords((previousRecords) => [newRecord, ...previousRecords.slice(0, 9)]);

      return previousDevices.map((device, index) =>
        index === targetIndex ? updatedDevice : device
      );
    });
  }

  function toggleStreaming() {
    setIsStreaming((previous) => !previous);
  }

  function stepOnce() {
    advanceSimulation();
  }

  function injectReplayAttack() {
    const targetDevice = devices[0];
    const staleRecord: VerificationRecord = {
      id: `tx-err-${Date.now()}`,
      deviceName: targetDevice.name,
      deviceAddress: targetDevice.address,
      nonce: targetDevice.nonce,
      deltaWattHours: 0,
      cumulativeWattHours: targetDevice.cumulativeWattHours,
      mintedTokens: 0,
      transactionHash: makeRandomHash(),
      timestamp: Date.now(),
      status: "stale"
    };
    setRecords((previous) => [staleRecord, ...previous]);
    setAttackMessage(`REVERT: Nonce #${targetDevice.nonce} is stale. Contract rejected double-spend!`);
    setTimeout(() => setAttackMessage(""), 5000);
  }

  function injectForgedAttack() {
    const targetDevice = devices[1];
    const forgedRecord: VerificationRecord = {
      id: `tx-forge-${Date.now()}`,
      deviceName: targetDevice.name,
      deviceAddress: targetDevice.address,
      nonce: targetDevice.nonce + 1,
      deltaWattHours: 0,
      cumulativeWattHours: targetDevice.cumulativeWattHours,
      mintedTokens: 0,
      transactionHash: makeRandomHash(),
      timestamp: Date.now(),
      status: "rejected"
    };
    setRecords((previous) => [forgedRecord, ...previous]);
    setAttackMessage("REVERT: ecrecover mismatch. Invalid ECDSA signature rejected!");
    setTimeout(() => setAttackMessage(""), 5000);
  }

  const totalWattHours = devices.reduce((sum, d) => sum + d.cumulativeWattHours, 0);
  const totalMintedTokens = Number((totalWattHours / 1000).toFixed(4));

  return {
    devices,
    records,
    latestRecord: records[0],
    isStreaming,
    attackMessage,
    totalWattHours,
    totalMintedTokens,
    toggleStreaming,
    stepOnce,
    injectReplayAttack,
    injectForgedAttack
  };
}

function makeRandomHash(): string {
  const characters = "0123456789abcdef";
  let result = "0x";
  for (let index = 0; index < 48; index += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
