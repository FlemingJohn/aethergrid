import { PlatformPillar } from "../types/PlatformPillar";
import { PlatformCard } from "./PlatformCard";

interface PlatformSectionProperties {
  pillars: PlatformPillar[];
}

export function PlatformSection({ pillars }: PlatformSectionProperties) {
  return (
    <section
      id="enterprises"
      style={{
        maxWidth: "var(--max-width-page)",
        margin: "0 auto",
        padding: "var(--space-eight) var(--space-six)",
        marginBottom: "var(--space-nine)",
        position: "relative",
        zIndex: 1
      }}
    >
      <div style={{ marginBottom: "var(--space-seven)" }}>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 800,
            letterSpacing: "0.1em",
            color: "var(--colour-accent)",
            display: "block",
            marginBottom: "var(--space-two)"
          }}
        >
          01 / PLATFORM
        </span>
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--colour-text-primary)",
            lineHeight: 1.15
          }}
        >
          What is AetherGrid?
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "var(--space-five)"
        }}
      >
        {pillars.map((pillar) => (
          <PlatformCard key={pillar.id} pillar={pillar} />
        ))}
      </div>
    </section>
  );
}

