# AetherGrid — Verifiable Energy Credits on Portaldot

AetherGrid is an on-chain audit and settlement protocol that turns signed renewable energy telemetry into cryptographically verified energy credits on the Portaldot Network.

## Problem
Renewable energy markets suffer from double-counting, unverified certificates, and centralized gatekeepers. Smart contracts cannot measure physical electrons directly, but they can verify cryptographic device signatures, enforce monotonic energy accumulation, prevent replay attacks, and automate reward distribution.

## Portaldot V3.0 Integration
- Portaldot EVM Chain ID: 420420777
- Portaldot Testnet RPC: https://test-evm-rpc-v3.portaldot.dev
- Portaldot Substrate Node: wss://test-node-v3.portaldot.dev
- Dual Runtime Architecture: WASM state verification alongside EVM liquid token settlement.
- Portaldot Python SDK: Direct edge node telematics and batch extrinsic integration.

## System Architecture

```
[ Virtual Energy Nodes ] (Inverter, Battery, Microgrid)
          │
          │ Signs telemetry payload with ECDSA keypair
          ▼
[ Portaldot EnergyRegistry Contract ]
          │ Checks signature validity (ecrecover)
          │ Enforces strictly monotonic cumulative watt-hours
          │ Enforces strictly increasing nonces (anti-replay)
          ▼
[ Portaldot EnergyCreditToken Contract ]
          │ Mints ERC-20 vREC tokens directly to device owners
          ▼
[ AetherGrid Web Interface ]
          │ Real-time telemetry monitoring
          │ Live cryptographic verification log
          │ Portaldot Testnet transaction links
```

## Repository Structure
- `contracts/`: Solidity smart contracts for energy accounting and credit minting.
- `simulator/`: Python virtual edge nodes running digital twin energy generation.
- `frontend/`: React and TypeScript interface styled in dark theme with green accents.

## Getting Started

### 1. Run the Frontend
```bash
cd aethergrid/frontend
npm install
npm run dev
```
Open http://localhost:3000 in your browser.

### 2. Run the Simulator
```bash
cd aethergrid/simulator
python fleet_runner.py
```

## Hackathon Submission Details
- Event: Portaldot Hacker House 2026
- Track: Ecosystem DApps / RWA Tokenization
- Networks: Portaldot Testnet V3.0 (EVM & WASM)

