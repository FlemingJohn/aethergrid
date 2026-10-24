import { Device } from "../types/Device";
import { VerificationRecord } from "../types/VerificationRecord";
import { FleetControls } from "./FleetControls";
import { TokenVaultCard } from "./TokenVaultCard";
import { PacketInspector } from "./PacketInspector";
import { DeviceGrid } from "./DeviceGrid";
import { TelemetryTable } from "./TelemetryTable";

interface SimulatorStudioProperties {
  devices: Device[];
  records: VerificationRecord[];
  latestRecord?: VerificationRecord;
  isStreaming: boolean;
  attackMessage: string;
  totalWattHours: number;
  totalMintedTokens: number;
  onToggleStreaming: () => void;
  onStepOnce: () => void;
  onInjectReplay: () => void;
  onInjectForged: () => void;
}

export function SimulatorStudio({
  devices,
  records,
  latestRecord,
  isStreaming,
  attackMessage,
  totalWattHours,
  totalMintedTokens,
  onToggleStreaming,
  onStepOnce,
  onInjectReplay,
  onInjectForged
}: SimulatorStudioProperties) {
  return (
    <div
      style={{
        maxWidth: "var(--max-width-page)",
        margin: "0 auto",
        padding: "var(--space-seven) var(--space-six)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-seven)"
      }}
    >
      <div>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 800,
            letterSpacing: "0.1em",
            color: "var(--colour-accent)",
            display: "block",
            marginBottom: "var(--space-one)"
          }}
        >
          LIVE RUNTIME WORKSTATION
        </span>
        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 800,
            color: "var(--colour-text-primary)",
            letterSpacing: "-0.03em"
          }}
        >
          Portaldot Digital Twin Studio
        </h1>
        <p style={{ color: "var(--colour-text-secondary)", fontSize: "0.9375rem", marginTop: "var(--space-one)" }}>
          Real-time energy telemetry stream, cryptographic signature generation, and on-chain verification.
        </p>
      </div>

      <FleetControls
        isStreaming={isStreaming}
        onToggleStreaming={onToggleStreaming}
        onStepOnce={onStepOnce}
        onInjectReplay={onInjectReplay}
        onInjectForged={onInjectForged}
        attackMessage={attackMessage}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "var(--space-five)"
        }}
      >
        <TokenVaultCard totalMintedTokens={totalMintedTokens} totalWattHours={totalWattHours} />
        <PacketInspector record={latestRecord} />
      </div>

      <DeviceGrid devices={devices} />

      <TelemetryTable records={records} />
    </div>
  );
}
