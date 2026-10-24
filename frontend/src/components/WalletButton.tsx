import { Wallet } from "lucide-react";
import { formatAddress } from "../lib/formatAddress";

interface WalletButtonProperties {
  accountAddress: string;
  isConnected: boolean;
  isConnecting: boolean;
  onConnect: () => void;
}

export function WalletButton({
  accountAddress,
  isConnected,
  isConnecting,
  onConnect
}: WalletButtonProperties) {
  if (isConnected) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--space-two)",
          padding: "var(--space-two) var(--space-four)",
          borderRadius: "var(--radius-small)",
          backgroundColor: "var(--colour-surface-elevated)",
          border: "1px solid var(--colour-accent-border)",
          fontSize: "0.8125rem",
          fontWeight: 600,
          fontFamily: "var(--font-family-code)",
          color: "var(--colour-accent)"
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            backgroundColor: "var(--colour-accent)"
          }}
        />
        <span>{formatAddress(accountAddress)}</span>
      </div>
    );
  }

  return (
    <button
      onClick={onConnect}
      disabled={isConnecting}
      style={{
        backgroundColor: "var(--colour-surface-elevated)",
        color: "var(--colour-text-primary)",
        fontWeight: 600,
        fontSize: "0.8125rem",
        padding: "var(--space-two) var(--space-four)",
        borderRadius: "var(--radius-small)",
        border: "1px solid var(--colour-border-strong)",
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-two)",
        cursor: "pointer",
        transition: "all 0.15s ease"
      }}
    >
      <Wallet size={15} color="var(--colour-accent)" />
      <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
    </button>
  );
}
