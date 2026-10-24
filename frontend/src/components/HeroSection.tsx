import { ArrowRight, Sun, BatteryCharging, Network } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import { Badge } from "./Badge";

interface HeroSectionProperties {
  onStartBuilding: () => void;
  onSeePossibilities: () => void;
}

export function HeroSection({ onStartBuilding, onSeePossibilities }: HeroSectionProperties) {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "var(--space-ten) var(--space-six) var(--space-eight)",
        position: "relative",
        zIndex: 1
      }}
    >
      <h1
        style={{
          fontSize: "clamp(3rem, 7vw, 5.25rem)",
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
          maxWidth: "920px",
          marginBottom: "var(--space-five)"
        }}
      >
        Create on{" "}
        <span
          style={{
            color: "var(--colour-accent)",
            textShadow: "0 0 50px var(--colour-accent-glow)"
          }}
        >
          Portaldot
        </span>
      </h1>

      <p
        style={{
          fontSize: "1.125rem",
          lineHeight: 1.6,
          color: "var(--colour-text-secondary)",
          maxWidth: "680px",
          marginBottom: "var(--space-six)"
        }}
      >
        Stream and verify clean energy telemetry on Portaldot V3.0. Open to developers, startups, and enterprises.
      </p>

      <div
        style={{
          display: "flex",
          gap: "var(--space-three)",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "var(--space-seven)"
        }}
      >
        <Badge icon={<Sun size={15} color="var(--colour-accent)" />}>Inverter Alpha</Badge>
        <Badge icon={<BatteryCharging size={15} color="var(--colour-accent)" />}>Storage Beta</Badge>
        <Badge icon={<Network size={15} color="var(--colour-accent)" />}>Microgrid Core</Badge>
      </div>

      <div style={{ display: "flex", gap: "var(--space-four)", alignItems: "center" }}>
        <PrimaryButton onClick={onStartBuilding}>
          <span>Start Building</span>
          <ArrowRight size={16} />
        </PrimaryButton>
        <SecondaryButton onClick={onSeePossibilities}>
          See What's Possible
        </SecondaryButton>
      </div>
    </section>
  );
}
