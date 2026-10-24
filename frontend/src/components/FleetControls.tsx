import { Play, Pause, FastForward, ShieldAlert, AlertTriangle } from "lucide-react";

interface FleetControlsProperties {
  isStreaming: boolean;
  onToggleStreaming: () => void;
  onStepOnce: () => void;
  onInjectReplay: () => void;
  onInjectForged: () => void;
  attackMessage: string;
}

export function FleetControls({
  isStreaming,
  onToggleStreaming,
  onStepOnce,
  onInjectReplay,
  onInjectForged,
  attackMessage
}: FleetControlsProperties) {
  return (
    <div
      style={{
        backgroundColor: "var(--colour-surface)",
        border: "1px solid var(--colour-border-subtle)",
        borderRadius: "var(--radius-medium)",
        padding: "var(--space-five) var(--space-six)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-four)"
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "var(--space-four)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-three)" }}>
          <button
            onClick={onToggleStreaming}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-two)",
              padding: "var(--space-two) var(--space-four)",
              borderRadius: "var(--radius-small)",
              backgroundColor: isStreaming ? "var(--colour-surface-elevated)" : "var(--colour-accent)",
              color: isStreaming ? "var(--colour-text-primary)" : "var(--colour-text-inverse)",
              fontWeight: 700,
              fontSize: "0.8125rem",
              border: "1px solid var(--colour-border-strong)"
            }}
          >
            {isStreaming ? <Pause size={15} /> : <Play size={15} />}
            <span>{isStreaming ? "Pause Live Stream" : "Start Live Stream"}</span>
          </button>

          <button
            onClick={onStepOnce}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-two)",
              padding: "var(--space-two) var(--space-four)",
              borderRadius: "var(--radius-small)",
              backgroundColor: "var(--colour-surface-elevated)",
              color: "var(--colour-text-secondary)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              border: "1px solid var(--colour-border-strong)"
            }}
          >
            <FastForward size={14} />
            <span>Emit 1 Pulse</span>
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-two)" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--colour-text-muted)", marginRight: "var(--space-two)" }}>
            Contract Invariant Tests:
          </span>
          <button
            onClick={onInjectReplay}
            style={{
              padding: "var(--space-two) var(--space-three)",
              borderRadius: "var(--radius-small)",
              backgroundColor: "var(--colour-surface-elevated)",
              color: "var(--colour-status-warning)",
              fontSize: "0.75rem",
              fontWeight: 600,
              border: "1px solid rgba(250, 204, 21, 0.25)",
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-one)"
            }}
          >
            <AlertTriangle size={13} />
            <span>Test Replay Rejection</span>
          </button>

          <button
            onClick={onInjectForged}
            style={{
              padding: "var(--space-two) var(--space-three)",
              borderRadius: "var(--radius-small)",
              backgroundColor: "var(--colour-surface-elevated)",
              color: "var(--colour-status-error)",
              fontSize: "0.75rem",
              fontWeight: 600,
              border: "1px solid rgba(239, 68, 68, 0.25)",
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-one)"
            }}
          >
            <ShieldAlert size={13} />
            <span>Test Forged Sig Rejection</span>
          </button>
        </div>
      </div>

      {attackMessage && (
        <div
          style={{
            padding: "var(--space-two) var(--space-four)",
            borderRadius: "var(--radius-small)",
            backgroundColor: "var(--colour-surface-elevated)",
            border: "1px solid var(--colour-accent-border)",
            fontSize: "0.8125rem",
            color: "var(--colour-accent)",
            fontFamily: "var(--font-family-code)"
          }}
        >
          {attackMessage}
        </div>
      )}
    </div>
  );
}
