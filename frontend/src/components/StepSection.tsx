import { StepItem } from "../types/StepItem";
import { StepCard } from "./StepCard";

interface StepSectionProperties {
  steps: StepItem[];
}

export function StepSection({ steps }: StepSectionProperties) {
  return (
    <section
      id="verifier"
      style={{
        maxWidth: "var(--max-width-page)",
        margin: "0 auto",
        padding: "0 var(--space-six)",
        marginBottom: "var(--space-nine)",
        position: "relative",
        zIndex: 1
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "var(--space-five)"
        }}
      >
        {steps.map((step) => (
          <StepCard key={step.numberPrefix} step={step} />
        ))}
      </div>
    </section>
  );
}

