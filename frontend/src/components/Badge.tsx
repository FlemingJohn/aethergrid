import { ReactNode } from "react";

interface BadgeProperties {
  children: ReactNode;
  icon?: ReactNode;
}

export function Badge({ children, icon }: BadgeProperties) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-two)",
        padding: "var(--space-two) var(--space-four)",
        borderRadius: "var(--radius-pill)",
        backgroundColor: "var(--colour-surface-elevated)",
        border: "1px solid var(--colour-border-subtle)",
        color: "var(--colour-text-secondary)",
        fontSize: "0.8125rem",
        fontWeight: 500
      }}
    >
      {icon}
      <span>{children}</span>
    </div>
  );
}

