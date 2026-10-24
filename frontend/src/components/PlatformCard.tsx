import { PlatformPillar } from "../types/PlatformPillar";

interface PlatformCardProperties {
  pillar: PlatformPillar;
}

export function PlatformCard({ pillar }: PlatformCardProperties) {
  return (
    <div
      style={{
        backgroundColor: "var(--colour-surface)",
        border: "1px solid var(--colour-border-subtle)",
        borderRadius: "var(--radius-medium)",
        padding: "var(--space-seven)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 800,
            fontFamily: "var(--font-family-code)",
            color: "var(--colour-accent)",
            display: "block",
            marginBottom: "var(--space-four)"
          }}
        >
          {pillar.numberLabel}
        </span>

        <h3
          style={{
            fontSize: "1.375rem",
            fontWeight: 700,
            color: "var(--colour-text-primary)",
            marginBottom: "var(--space-three)"
          }}
        >
          {pillar.title}
        </h3>

        <p
          style={{
            fontSize: "0.9375rem",
            lineHeight: 1.6,
            color: "var(--colour-text-secondary)"
          }}
        >
          {pillar.description}
        </p>
      </div>

      <div style={{ marginTop: "var(--space-six)", paddingTop: "var(--space-four)", borderTop: "1px solid var(--colour-border-subtle)" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", color: "var(--colour-text-muted)" }}>
          {pillar.highlightText}
        </span>
      </div>
    </div>
  );
}

