import { MetricItem } from "../types/MetricItem";

interface StatsRowProperties {
  metrics: MetricItem[];
}

export function StatsRow({ metrics }: StatsRowProperties) {
  return (
    <section
      id="developers"
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
          display: "flex",
          justifyContent: "center",
          marginBottom: "var(--space-seven)"
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-two)",
            padding: "var(--space-two) var(--space-four)",
            borderRadius: "var(--radius-small)",
            backgroundColor: "var(--colour-surface)",
            border: "1px solid var(--colour-border-subtle)",
            fontSize: "0.8125rem",
            color: "var(--colour-text-secondary)"
          }}
        >
          <span>No access needed until prod - build on</span>
          <span
            style={{
              color: "var(--colour-accent)",
              backgroundColor: "var(--colour-accent-surface)",
              padding: "var(--space-one) var(--space-two)",
              borderRadius: "var(--radius-small)",
              fontFamily: "var(--font-family-code)",
              fontWeight: 600,
              fontSize: "0.75rem"
            }}
          >
            localhost
          </span>
          <span
            style={{
              color: "var(--colour-text-secondary)",
              backgroundColor: "var(--colour-surface-elevated)",
              padding: "var(--space-one) var(--space-two)",
              borderRadius: "var(--radius-small)",
              fontFamily: "var(--font-family-code)",
              fontSize: "0.75rem"
            }}
          >
            127.0.0.1
          </span>
          <span
            style={{
              color: "var(--colour-text-secondary)",
              backgroundColor: "var(--colour-surface-elevated)",
              padding: "var(--space-one) var(--space-two)",
              borderRadius: "var(--radius-small)",
              fontFamily: "var(--font-family-code)",
              fontSize: "0.75rem"
            }}
          >
            420420777
          </span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1px",
          backgroundColor: "var(--colour-border-subtle)",
          border: "1px solid var(--colour-border-subtle)",
          borderRadius: "var(--radius-medium)",
          overflow: "hidden"
        }}
      >
        {metrics.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "var(--colour-surface)",
              padding: "var(--space-seven) var(--space-seven)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                fontSize: "3.75rem",
                fontWeight: 800,
                color: "var(--colour-accent)",
                lineHeight: 1,
                marginBottom: "var(--space-three)",
                fontFamily: "var(--font-family-code)"
              }}
            >
              {item.metricValue}
            </div>
            <div
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--colour-text-primary)",
                marginBottom: "var(--space-one)"
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                fontSize: "0.8125rem",
                color: "var(--colour-text-secondary)",
                lineHeight: 1.4
              }}
            >
              {item.subtitle}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
