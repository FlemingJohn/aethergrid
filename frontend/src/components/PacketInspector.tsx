import { ShieldCheck, Code } from "lucide-react";
import { VerificationRecord } from "../types/VerificationRecord";

interface PacketInspectorProperties {
  record?: VerificationRecord;
}

export function PacketInspector({ record }: PacketInspectorProperties) {
  if (!record) {
    return (
      <div
        style={{
          backgroundColor: "var(--colour-surface)",
          border: "1px solid var(--colour-border-subtle)",
          borderRadius: "var(--radius-medium)",
          padding: "var(--space-six)",
          color: "var(--colour-text-muted)",
          fontSize: "0.875rem"
        }}
      >
        Waiting for initial telemetry packet...
      </div>
    );
  }

  const rawJson = JSON.stringify(
    {
      device: record.deviceName,
      address: record.deviceAddress,
      nonce: record.nonce,
      deltaWh: record.deltaWattHours,
      cumulativeWh: record.cumulativeWattHours,
      timestamp: record.timestamp
    },
    null,
    2
  );

  return (
    <div
      style={{
        backgroundColor: "var(--colour-surface)",
        border: "1px solid var(--colour-border-subtle)",
        borderRadius: "var(--radius-medium)",
        padding: "var(--space-six)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-four)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-two)" }}>
          <Code size={16} color="var(--colour-accent)" />
          <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--colour-text-primary)" }}>
            Cryptographic Payload Inspector
          </span>
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-one)",
            color: "var(--colour-accent)",
            fontSize: "0.75rem",
            fontWeight: 700
          }}
        >
          <ShieldCheck size={14} />
          <span>ECDSA VERIFIED</span>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "var(--colour-background)",
          border: "1px solid var(--colour-border-subtle)",
          borderRadius: "var(--radius-small)",
          padding: "var(--space-three)",
          fontFamily: "var(--font-family-code)",
          fontSize: "0.75rem",
          color: "var(--colour-text-secondary)",
          maxHeight: "140px",
          overflowY: "auto"
        }}
      >
        <pre>{rawJson}</pre>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-one)", fontSize: "0.75rem" }}>
        <span style={{ color: "var(--colour-text-muted)" }}>ECDSA Digest (Keccak-256):</span>
        <span style={{ fontFamily: "var(--font-family-code)", color: "var(--colour-accent)", wordBreak: "break-all" }}>
          {record.transactionHash}
        </span>
      </div>
    </div>
  );
}
