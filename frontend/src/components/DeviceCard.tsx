import { Zap, Thermometer, Battery, Key } from "lucide-react";
import { Device } from "../types/Device";
import { formatAddress } from "../lib/formatAddress";
import { formatNumber } from "../lib/formatNumber";
import { StatusChip } from "./StatusChip";

interface DeviceCardProperties {
  device: Device;
}

export function DeviceCard({ device }: DeviceCardProperties) {
  const percentage = Math.min(100, Math.round((device.currentKilowatts / device.nominalKilowatts) * 100));

  return (
    <div
      style={{
        backgroundColor: "var(--colour-surface)",
        border: "1px solid var(--colour-border-subtle)",
        borderRadius: "var(--radius-medium)",
        padding: "var(--space-six)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-five)"
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-two)", marginBottom: "var(--space-one)" }}>
            <h4 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--colour-text-primary)" }}>
              {device.name}
            </h4>
            <StatusChip status="online" />
          </div>
          <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-family-code)", color: "var(--colour-text-muted)" }}>
            {formatAddress(device.address)}
          </span>
        </div>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "var(--radius-small)",
            backgroundColor: "var(--colour-accent-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--colour-accent)"
          }}
        >
          <Zap size={16} />
        </div>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "var(--space-two)" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--colour-text-secondary)" }}>
            CURRENT OUTPUT
          </span>
          <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--colour-accent)", fontFamily: "var(--font-family-code)" }}>
            {formatNumber(device.currentKilowatts)} kW
          </span>
        </div>

        <div style={{ width: "100%", height: 6, backgroundColor: "var(--colour-surface-elevated)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
          <div
            style={{
              width: `${percentage}%`,
              height: "100%",
              backgroundColor: "var(--colour-accent)",
              borderRadius: "var(--radius-pill)",
              transition: "width 0.4s ease"
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--space-three)",
          paddingTop: "var(--space-three)",
          borderTop: "1px solid var(--colour-border-subtle)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-two)" }}>
          <Thermometer size={14} color="var(--colour-text-muted)" />
          <span style={{ fontSize: "0.75rem", color: "var(--colour-text-secondary)" }}>
            {device.temperatureCelsius}°C
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-two)" }}>
          <Battery size={14} color="var(--colour-text-muted)" />
          <span style={{ fontSize: "0.75rem", color: "var(--colour-text-secondary)" }}>
            {device.batteryPercentage}% SoC
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-two)" }}>
          <Zap size={14} color="var(--colour-text-muted)" />
          <span style={{ fontSize: "0.75rem", color: "var(--colour-text-secondary)" }}>
            {formatNumber(device.cumulativeWattHours / 1000, 1)} kWh total
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-two)" }}>
          <Key size={14} color="var(--colour-text-muted)" />
          <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-family-code)", color: "var(--colour-text-secondary)" }}>
            Nonce #{device.nonce}
          </span>
        </div>
      </div>
    </div>
  );
}

