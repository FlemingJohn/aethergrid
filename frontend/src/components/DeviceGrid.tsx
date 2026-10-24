import { Device } from "../types/Device";
import { DeviceCard } from "./DeviceCard";

interface DeviceGridProperties {
  devices: Device[];
}

export function DeviceGrid({ devices }: DeviceGridProperties) {
  return (
    <section
      id="devices"
      style={{
        maxWidth: "var(--max-width-page)",
        margin: "0 auto",
        padding: "0 var(--space-six)",
        marginBottom: "var(--space-nine)",
        position: "relative",
        zIndex: 1
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "var(--space-six)"
        }}
      >
        <div>
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
            ACTIVE VIRTUAL ASSETS
          </span>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--colour-text-primary)" }}>
            Digital Twin Node Fleet
          </h2>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "var(--space-five)"
        }}
      >
        {devices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </section>
  );
}

