import { useState } from "react";
import { NavigationBar } from "./components/NavigationBar";
import { HeroSection } from "./components/HeroSection";
import { StatsRow } from "./components/StatsRow";
import { StepSection } from "./components/StepSection";
import { PlatformSection } from "./components/PlatformSection";
import { FaqSection } from "./components/FaqSection";
import { CallToActionSection } from "./components/CallToActionSection";
import { SimulatorStudio } from "./components/SimulatorStudio";
import { Footer } from "./components/Footer";
import { useSimulation } from "./hooks/useSimulation";
import { usePortaldotWallet } from "./hooks/usePortaldotWallet";
import { MetricItem } from "./types/MetricItem";
import { StepItem } from "./types/StepItem";
import { PlatformPillar } from "./types/PlatformPillar";
import { FaqItem } from "./types/FaqItem";

const metricItems: MetricItem[] = [
  {
    id: "nodes",
    metricValue: "3",
    title: "Active Nodes",
    subtitle: "Inverter · Battery · Microgrid"
  },
  {
    id: "telemetry",
    metricValue: "51",
    title: "Telemetry Signals",
    subtitle: "Voltage, kW, SoC, temp & nonces"
  },
  {
    id: "possibilities",
    metricValue: "∞",
    title: "Possibilities",
    subtitle: "Microgrids, DAOs, RWA factoring"
  }
];

const stepItems: StepItem[] = [
  {
    numberPrefix: "01",
    category: "PERSONAL USE",
    title: "Connect your Edge Node",
    description: "Pick your virtual device. Paste the keypair. Stream signed telemetry. You're done.",
    tag: "NO ACCESS REQUIRED"
  },
  {
    numberPrefix: "02",
    category: "BUILD",
    title: "Start Building",
    description: "No approval needed. Prototype on localhost against real Portaldot contracts - free.",
    tag: "SELF-SERVE"
  },
  {
    numberPrefix: "03",
    category: "SHIP",
    title: "Apply for Prod Access",
    description: "Ready to go live? Tell us who you are, what you built, and share a demo.",
    tag: "PARTNERSHIP BEGINS"
  }
];

const platformPillars: PlatformPillar[] = [
  {
    id: "cryptographic-proof",
    numberLabel: "01 / AUDIT",
    title: "Cryptographic Proof-of-Power",
    description: "Every energy reading is signed off-chain with the hardware device's private key. The on-chain registry verifies signatures via ecrecover and enforces strict anti-replay protection with monotonic nonces.",
    highlightText: "ZERO SPOOFING · TAMPER-PROOF"
  },
  {
    id: "dual-runtime",
    numberLabel: "02 / RUNTIME",
    title: "Dual WASM & EVM Execution",
    description: "Built for Portaldot V3.0. High-frequency state validation and complex mathematical battery curves run in memory-safe ink! WebAssembly, while liquid vREC tokens settle natively on the Portaldot EVM layer.",
    highlightText: "SUB-SECOND FINALITY · 10,000+ TPS"
  },
  {
    id: "autonomous-settlement",
    numberLabel: "03 / KEEPERLESS",
    title: "Autonomous Block Settlement",
    description: "Unlike Ethereum or Solana that rely on third-party keeper bots charging high extraction fees, Portaldot native scheduler coordinates recurring distribution rounds directly within the consensus runtime.",
    highlightText: "ZERO KEEPER MEV · NATIVE SCHEDULING"
  }
];

const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "Do I need physical solar panels or battery hardware to test?",
    answer: "No. In enterprise DePIN and IoT engineering, software digital twins simulate physical hardware with 100% cryptographic parity. The Python simulator uses real keypairs to sign telemetry that the blockchain cannot distinguish from physical microcontrollers."
  },
  {
    id: "faq-2",
    question: "How does AetherGrid prevent duplicate credit claims?",
    answer: "Every reading requires a strictly increasing nonce and strictly monotonic cumulative watt-hours. If an attacker re-submits an earlier report, the smart contract immediately reverts with a stale nonce error."
  },
  {
    id: "faq-3",
    question: "Which Portaldot network parameters are supported?",
    answer: "AetherGrid is built for Portaldot Testnet V3.0, running on EVM Chain ID 420420777 (RPC: test-evm-rpc-v3.portaldot.dev) alongside Substrate WebSocket node wss://test-node-v3.portaldot.dev."
  }
];

export function App() {
  const [activeView, setActiveView] = useState<"landing" | "studio">("studio");
  const simulation = useSimulation();
  const wallet = usePortaldotWallet();

  function handleOpenStudio() {
    setActiveView("studio");
  }

  function handlePrimaryNavClick() {
    if (activeView === "landing") {
      setActiveView("studio");
    } else {
      simulation.toggleStreaming();
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <NavigationBar
        activeView={activeView}
        onChangeView={setActiveView}
        onStartBuilding={handlePrimaryNavClick}
        isStreaming={simulation.isStreaming}
        accountAddress={wallet.accountAddress}
        isConnected={wallet.isConnected}
        isConnecting={wallet.isConnecting}
        onConnectWallet={wallet.connectWallet}
      />

      <main style={{ flex: 1 }}>
        {activeView === "studio" ? (
          <SimulatorStudio
            devices={simulation.devices}
            records={simulation.records}
            latestRecord={simulation.latestRecord}
            isStreaming={simulation.isStreaming}
            attackMessage={simulation.attackMessage}
            totalWattHours={simulation.totalWattHours}
            totalMintedTokens={simulation.totalMintedTokens}
            onToggleStreaming={simulation.toggleStreaming}
            onStepOnce={simulation.stepOnce}
            onInjectReplay={simulation.injectReplayAttack}
            onInjectForged={simulation.injectForgedAttack}
          />
        ) : (
          <>
            <HeroSection
              onStartBuilding={handleOpenStudio}
              onSeePossibilities={handleOpenStudio}
            />
            <StatsRow metrics={metricItems} />
            <StepSection steps={stepItems} />
            <PlatformSection pillars={platformPillars} />
            <FaqSection items={faqItems} />
            <CallToActionSection onStartBuilding={handleOpenStudio} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
