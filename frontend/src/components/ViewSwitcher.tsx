interface ViewSwitcherProperties {
  activeView: "landing" | "studio";
  onChangeView: (view: "landing" | "studio") => void;
}

export function ViewSwitcher({ activeView, onChangeView }: ViewSwitcherProperties) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: "var(--colour-surface-elevated)",
        borderRadius: "var(--radius-small)",
        padding: "3px",
        border: "1px solid var(--colour-border-subtle)"
      }}
    >
      <button
        onClick={() => onChangeView("landing")}
        style={{
          padding: "var(--space-one) var(--space-three)",
          borderRadius: "4px",
          fontSize: "0.75rem",
          fontWeight: 700,
          backgroundColor: activeView === "landing" ? "var(--colour-surface-highlight)" : "transparent",
          color: activeView === "landing" ? "var(--colour-text-primary)" : "var(--colour-text-muted)",
          transition: "all 0.15s ease"
        }}
      >
        Landing
      </button>

      <button
        onClick={() => onChangeView("studio")}
        style={{
          padding: "var(--space-one) var(--space-three)",
          borderRadius: "4px",
          fontSize: "0.75rem",
          fontWeight: 700,
          backgroundColor: activeView === "studio" ? "var(--colour-accent)" : "transparent",
          color: activeView === "studio" ? "var(--colour-text-inverse)" : "var(--colour-text-muted)",
          boxShadow: activeView === "studio" ? "0 0 12px var(--colour-accent-glow)" : "none",
          transition: "all 0.15s ease"
        }}
      >
        Live Studio
      </button>
    </div>
  );
}

