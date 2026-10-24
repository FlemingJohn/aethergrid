import { useState } from "react";
import { Coins, CheckCircle2 } from "lucide-react";
import { formatNumber } from "../lib/formatNumber";

interface TokenVaultCardProperties {
  totalMintedTokens: number;
  totalWattHours: number;
}

export function TokenVaultCard({ totalMintedTokens, totalWattHours }: TokenVaultCardProperties) {
  const [hasClaimed, setHasClaimed] = useState<boolean>(false);

  function handleClaim() {
    setHasClaimed(true);
    setTimeout(() => {
      setHasClaimed(false);
    }, 4000);
  }

  return (
    <div
      style={{
        backgroundColor: "var(--colour-surface)",
        border: "1px solid var(--colour-border-subtle)",
        borderRadius: "var(--radius-medium)",
        padding: "var(--space-six)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-four)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-two)" }}>
            <Coins size={16} color="var(--colour-accent)" />
            <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--colour-text-primary)" }}>
              Energy Credit Vault
            </span>
          </div>
          <span style={{ fontSize: "0.6875rem", fontFamily: "var(--font-family-code)", color: "var(--colour-text-muted)" }}>
            CHAIN 420420777
          </span>
        </div>

        <div style={{ marginBottom: "var(--space-five)" }}>
          <div style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--colour-accent)", fontFamily: "var(--font-family-code)", lineHeight: 1 }}>
            {formatNumber(totalMintedTokens, 4)} vREC
          </div>
          <span style={{ fontSize: "0.8125rem", color: "var(--colour-text-secondary)" }}>
            Issued against {formatNumber(totalWattHours / 1000, 2)} kWh verified generation
          </span>
        </div>
      </div>

      <button
        onClick={handleClaim}
        style={{
          width: "100%",
          padding: "var(--space-three)",
          borderRadius: "var(--radius-small)",
          backgroundColor: hasClaimed ? "var(--colour-surface-elevated)" : "var(--colour-accent)",
          color: hasClaimed ? "var(--colour-accent)" : "var(--colour-text-inverse)",
          fontWeight: 700,
          fontSize: "0.8125rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-two)",
          border: hasClaimed ? "1px solid var(--colour-accent-border)" : "none",
          transition: "all 0.2s ease"
        }}
      >
        {hasClaimed ? (
          <>
            <CheckCircle2 size={16} />
            <span>Tokens Claimed to MetaMask!</span>
          </>
        ) : (
          <span>Claim vREC to MetaMask</span>
        )}
      </button>
    </div>
  );
}

