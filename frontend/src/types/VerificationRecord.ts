export interface VerificationRecord {
  id: string;
  deviceName: string;
  deviceAddress: string;
  nonce: number;
  deltaWattHours: number;
  cumulativeWattHours: number;
  mintedTokens: number;
  transactionHash: string;
  timestamp: number;
  status: "verified" | "rejected" | "stale";
}

