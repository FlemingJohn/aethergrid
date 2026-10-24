import { ArrowRight } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";

interface CallToActionSectionProperties {
  onStartBuilding: () => void;
}

export function CallToActionSection({ onStartBuilding }: CallToActionSectionProperties) {
  return (
    <section
      style={{
        maxWidth: "var(--max-width-page)",
        margin: "0 auto",
        padding: "0 var(--space-six)",
        marginBottom: "var(--space-ten)",
        position: "relative",
        zIndex: 1
      }}
    >
      <div
        style={{
          backgroundColor: "var(--colour-surface)",
          border: "1px solid var(--colour-accent-border)",
          borderRadius: "var(--radius-large)",
          padding: "var(--space-nine) var(--space-seven)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 0 60px var(--colour-accent-glow)"
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: "var(--space-four)",
            lineHeight: 1.15
          }}
        >
          Start Building on{" "}
          <span style={{ color: "var(--colour-accent)" }}>Portaldot</span>
        </h2>

        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--colour-text-secondary)",
            maxWidth: "580px",
            lineHeight: 1.6,
            marginBottom: "var(--space-seven)"
          }}
        >
          Deploy digital twins, verify renewable telemetry with ECDSA nonces, and issue energy credit tokens on Portaldot testnet.
        </p>

        <PrimaryButton onClick={onStartBuilding}>
          <span>Start Building</span>
          <ArrowRight size={16} />
        </PrimaryButton>
      </div>
    </section>
  );
}
