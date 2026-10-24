import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="portaldot"
      style={{
        borderTop: "1px solid var(--colour-border-subtle)",
        backgroundColor: "var(--colour-surface)",
        padding: "var(--space-eight) var(--space-seven)",
        position: "relative",
        zIndex: 1
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-width-page)",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "var(--space-six)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-three)" }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "var(--radius-small)",
              backgroundColor: "var(--colour-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--colour-text-inverse)"
            }}
          >
            <Zap size={16} strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: "1rem", fontWeight: 800 }}>AetherGrid</span>
          <span style={{ fontSize: "0.8125rem", color: "var(--colour-text-muted)" }}>
            Built for Portaldot Hacker House 2026
          </span>
        </div>

        <div style={{ display: "flex", gap: "var(--space-six)", fontSize: "0.8125rem", color: "var(--colour-text-secondary)" }}>
          <div>
            <span style={{ color: "var(--colour-text-muted)" }}>Chain ID: </span>
            <span style={{ fontFamily: "var(--font-family-code)" }}>420420777</span>
          </div>
          <div>
            <span style={{ color: "var(--colour-text-muted)" }}>RPC: </span>
            <span style={{ fontFamily: "var(--font-family-code)" }}>test-evm-rpc-v3.portaldot.dev</span>
          </div>
          <div>
            <span style={{ color: "var(--colour-text-muted)" }}>Substrate: </span>
            <span style={{ fontFamily: "var(--font-family-code)" }}>test-node-v3.portaldot.dev</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

