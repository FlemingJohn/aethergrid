import { ReactNode } from "react";

interface PrimaryButtonProperties {
  children: ReactNode;
  onClick?: () => void;
  isDisabled?: boolean;
}

export function PrimaryButton({ children, onClick, isDisabled }: PrimaryButtonProperties) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      style={{
        backgroundColor: "var(--colour-accent)",
        color: "var(--colour-text-inverse)",
        fontWeight: 700,
        fontSize: "0.875rem",
        padding: "var(--space-three) var(--space-six)",
        borderRadius: "var(--radius-small)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-two)",
        letterSpacing: "0.02em",
        opacity: isDisabled ? 0.6 : 1,
        transition: "all 0.15s ease",
        boxShadow: "0 0 20px var(--colour-accent-glow)"
      }}
    >
      {children}
    </button>
  );
}

