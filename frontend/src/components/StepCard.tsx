import { ArrowUpRight } from "lucide-react";
import { StepItem } from "../types/StepItem";

interface StepCardProperties {
  step: StepItem;
}

export function StepCard({ step }: StepCardProperties) {
  return (
    <div
      style={{
        backgroundColor: "var(--colour-surface)",
        border: "1px solid var(--colour-border-subtle)",
        borderRadius: "var(--radius-medium)",
        padding: "var(--space-six)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "260px",
        transition: "border-color 0.2s ease"
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "var(--space-five)"
          }}
        >
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "var(--colour-text-muted)"
            }}
          >
            {step.numberPrefix} · {step.category}
          </span>
          <ArrowUpRight size={16} color="var(--colour-text-muted)" />
        </div>

        <h3
          style={{
            fontSize: "1.375rem",
            fontWeight: 700,
            color: "var(--colour-text-primary)",
            marginBottom: "var(--space-three)",
            lineHeight: 1.25
          }}
        >
          {step.title}
        </h3>

        <p
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.5,
            color: "var(--colour-text-secondary)"
          }}
        >
          {step.description}
        </p>
      </div>

      <div style={{ marginTop: "var(--space-six)" }}>
        <span
          style={{
            fontSize: "0.6875rem",
            fontWeight: 800,
            letterSpacing: "0.08em",
            color: "var(--colour-accent)"
          }}
        >
          {step.tag}
        </span>
      </div>
    </div>
  );
}

