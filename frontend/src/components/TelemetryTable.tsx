import { ExternalLink } from "lucide-react";
import { VerificationRecord } from "../types/VerificationRecord";
import { formatAddress } from "../lib/formatAddress";
import { formatNumber } from "../lib/formatNumber";
import { StatusChip } from "./StatusChip";

interface TelemetryTableProperties {
  records: VerificationRecord[];
}

export function TelemetryTable({ records }: TelemetryTableProperties) {
  return (
    <section
      id="telemetry"
      style={{
        maxWidth: "var(--max-width-page)",
        margin: "0 auto",
        padding: "0 var(--space-six)",
        marginBottom: "var(--space-nine)",
        position: "relative",
        zIndex: 1
      }}
    >
      <div style={{ marginBottom: "var(--space-six)" }}>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "var(--colour-accent)",
            display: "block",
            marginBottom: "var(--space-one)"
          }}
        >
          LIVE ON-CHAIN AUDIT LOG
        </span>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--colour-text-primary)" }}>
          Verified Energy Credit Settlements
        </h2>
      </div>

      <div
        style={{
          backgroundColor: "var(--colour-surface)",
          border: "1px solid var(--colour-border-subtle)",
          borderRadius: "var(--radius-medium)",
          overflow: "hidden"
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--colour-border-subtle)", color: "var(--colour-text-muted)" }}>
                <th style={{ padding: "var(--space-four) var(--space-five)" }}>DEVICE</th>
                <th style={{ padding: "var(--space-four) var(--space-five)" }}>NONCE</th>
                <th style={{ padding: "var(--space-four) var(--space-five)" }}>DELTA</th>
                <th style={{ padding: "var(--space-four) var(--space-five)" }}>MINTED vREC</th>
                <th style={{ padding: "var(--space-four) var(--space-five)" }}>STATUS</th>
                <th style={{ padding: "var(--space-four) var(--space-five)" }}>TESTNET TRANSACTION</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr
                  key={record.id}
                  style={{
                    borderBottom: "1px solid var(--colour-border-subtle)",
                    transition: "background-color 0.15s ease"
                  }}
                >
                  <td style={{ padding: "var(--space-four) var(--space-five)" }}>
                    <div style={{ fontWeight: 600, color: "var(--colour-text-primary)" }}>{record.deviceName}</div>
                    <div style={{ fontSize: "0.6875rem", fontFamily: "var(--font-family-code)", color: "var(--colour-text-muted)" }}>
                      {formatAddress(record.deviceAddress)}
                    </div>
                  </td>
                  <td style={{ padding: "var(--space-four) var(--space-five)", fontFamily: "var(--font-family-code)" }}>
                    #{record.nonce}
                  </td>
                  <td style={{ padding: "var(--space-four) var(--space-five)", fontFamily: "var(--font-family-code)" }}>
                    +{formatNumber(record.deltaWattHours / 1000, 3)} kWh
                  </td>
                  <td style={{ padding: "var(--space-four) var(--space-five)", fontWeight: 700, color: "var(--colour-accent)", fontFamily: "var(--font-family-code)" }}>
                    +{formatNumber(record.mintedTokens, 4)} vREC
                  </td>
                  <td style={{ padding: "var(--space-four) var(--space-five)" }}>
                    <StatusChip status={record.status} />
                  </td>
                  <td style={{ padding: "var(--space-four) var(--space-five)" }}>
                    <a
                      href={`https://node-console.portaldot.dev/#/explorer`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "var(--space-one)",
                        fontFamily: "var(--font-family-code)",
                        color: "var(--colour-text-secondary)"
                      }}
                    >
                      <span>{formatAddress(record.transactionHash)}</span>
                      <ExternalLink size={12} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

