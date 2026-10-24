import { Zap, SunMedium } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";
import { WalletButton } from "./WalletButton";

interface NavigationBarProperties {
  onStartBuilding: () => void;
  isStreaming: boolean;
  accountAddress: string;
  isConnected: boolean;
  isConnecting: boolean;
  onConnectWallet: () => void;
}

export function NavigationBar({
  onStartBuilding,
  isStreaming,
  accountAddress,
  isConnected,
  isConnecting,
  onConnectWallet
}: NavigationBarProperties) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--space-four) var(--space-seven)",
        borderBottom: "1px solid var(--colour-border-subtle)",
        backgroundColor: "rgba(9, 9, 11, 0.9)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-three)" }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "var(--radius-small)",
            backgroundColor: "var(--colour-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--colour-text-inverse)"
          }}
        >
          <Zap size={20} strokeWidth={2.5} />
        </div>
        <span style={{ fontSize: "1.125rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
          AetherGrid
        </span>
      </div>

      <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-six)" }}>
        <a href="#developers" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--colour-text-secondary)" }}>
          DEVELOPERS
        </a>
        <a href="#enterprises" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--colour-text-secondary)" }}>
          ENTERPRISES
        </a>
        <a href="#docs" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--colour-text-secondary)" }}>
          DOCS
        </a>
        <a href="#blog" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--colour-text-secondary)" }}>
          BLOG
        </a>
        <a href="#faq" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--colour-text-secondary)" }}>
          FAQ
        </a>
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-three)" }}>
        <button
          style={{
            background: "none",
            border: "none",
            color: "var(--colour-text-secondary)",
            padding: "var(--space-two)",
            cursor: "pointer"
          }}
        >
          <SunMedium size={18} />
        </button>
        <WalletButton
          accountAddress={accountAddress}
          isConnected={isConnected}
          isConnecting={isConnecting}
          onConnect={onConnectWallet}
        />
        <PrimaryButton onClick={onStartBuilding}>
          {isStreaming ? "START BUILDING" : "RESUME STREAM"}
        </PrimaryButton>
      </div>
    </header>
  );
}
