import { ReactNode } from "react";

interface SecondaryButtonProperties {
  children: ReactNode;
  onClick?: () => void;
}

export function SecondaryButton({ children, onClick }: SecondaryButtonProperties) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "var(--colour-surface-elevated)",
        color: "var(--colour-text-primary)",
        fontWeight: 600,
        fontSize: "0.875rem",
        padding: "var(--space-three) var(--space-six)",
        borderRadius: "var(--radius-small)",
        border: "1px solid var(--colour-border-strong)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-two)",
        transition: "all 0.15s ease"
      }}
    >
      {children}
    </button>
  );
}

