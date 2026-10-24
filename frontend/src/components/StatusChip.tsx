interface StatusChipProperties {
  status: "verified" | "rejected" | "stale" | "online";
}

export function StatusChip({ status }: StatusChipProperties) {
  const isPositive = status === "verified" || status === "online";
  const label = status.toUpperCase();

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-one)",
        padding: "var(--space-one) var(--space-two)",
        borderRadius: "var(--radius-small)",
        fontSize: "0.6875rem",
        fontWeight: 700,
        letterSpacing: "0.05em",
        backgroundColor: isPositive ? "var(--colour-accent-surface)" : "var(--colour-surface-elevated)",
        color: isPositive ? "var(--colour-accent)" : "var(--colour-status-error)",
        border: `1px solid ${isPositive ? "var(--colour-accent-border)" : "var(--colour-border-subtle)"}`
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: isPositive ? "var(--colour-accent)" : "var(--colour-status-error)"
        }}
      />
      {label}
    </span>
  );
}

