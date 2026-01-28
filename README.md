# TIPSPAY BLOCKC

[![CI – Contracts](https://img.shields.io/github/actions/workflow/status/tipspay-dev/tipspay-blockc/contracts.yml?label=Contracts%20CI)](../../actions)
[![CI – Backend](https://img.shields.io/github/actions/workflow/status/tipspay-dev/tipspay-blockc/backend.yml?label=Backend%20CI)](../../actions)
[![CI – Frontend](https://img.shields.io/github/actions/workflow/status/tipspay-dev/tipspay-blockc/frontend.yml?label=Frontend%20CI)](../../actions)
![License](https://img.shields.io/github/license/tipspay-dev/tipspay-blockc)
![TypeScript](https://img.shields.io/badge/code-TypeScript-blue)
![Solidity](https://img.shields.io/badge/contracts-Solidity-363636)

TIPSPAY BLOCKC is an end‑to‑end blockchain infrastructure powering the Tipspay ecosystem.  
It combines the TPSC token, the bDOI identity standard, and an on‑chain hosting payment system into a unified, production‑ready architecture.

---

## Repository Structure

```text
tipspay-blockc/
├── contracts/   # TPSC, bDOIRegistry, HostingPayments
├── backend/     # Event listener, HMAC webhook, hosting activation
└── frontend/    # React payment UI
flowchart LR
    U[User Wallet / Browser] --> F[Frontend (React + ethers.js)]
    F --> RPC[AWS Managed Blockchain RPC]
    RPC --> SC[Smart Contracts<br/>TPSC / bDOIRegistry / HostingPayments]

    SC -->|HostingPaid event| L[Backend Listener]
    L -->|HMAC Webhook| API[/Backend API<br/>/api/hosting/activate/]
    API --> DB[(DB)]
    API --> HP[Hosting Providers<br/>cPanel / Plesk / Spaceship]

    DB --> PANEL[User Panel / Status]
Features
On‑chain hosting payments (TPSC / USDT)

bDOI (Blockchain Digital Object Identifier) registry

Event‑driven backend activation flow

AWS Managed Blockchain RPC integration

CI/CD pipelines (GitHub Actions)

Modular monorepo for contracts, backend, and frontend

Tech Stack
Solidity (Hardhat)

Node.js  + Express

React + Vite

ethers.js

AWS Managed Blockchain

GitHub Actions

Getting Started
Clone
git clone https://github.com/tipspay-dev/tipspay-blockc.git
cd tipspay-blockc

Contracts
cd contracts
pnpm install
pnpm build
pnpm test

Backend
cd backend
pnpm install
pnpm build
pnpm start

Frontend
cd frontend
pnpm install
pnpm dev

Security
See SECURITY.md.

License
MIT License

---

## **`architecture.md`**

```markdown
# TIPSPAY BLOCKC – System Architecture

This document describes the full end‑to‑end architecture of the TIPSPAY BLOCKC ecosystem.

---

## 1. High‑Level Architecture
[User Wallet / Browser]
│
▼
[Frontend (React / Vite)]
│  ethers.js
▼
[AWS Managed Blockchain RPC]
│
▼
[Smart Contracts: TPSC, bDOIRegistry, HostingPayments]
│
├──────────────► [Backend Listener]
│                        │
│                        ▼
│                [HMAC Webhook → /api/hosting/activate]
│                        │
▼                        ▼
[Explorer / Analytics]     [DB + Hosting Provider Integrations]

---

## 2. Smart Contracts

### TPSC.sol
ERC‑20 token used for payments.

### bDOIRegistry.sol
Canonical identity registry for contracts and digital assets.

### HostingPayments.sol
Handles hosting plan payments and emits `HostingPaid`.

---

## 3. Backend

- Listens to `HostingPaid` events  
- Sends HMAC‑signed webhook  
- Activates hosting via external providers  
- Stores subscription data  

Flow:

1. User pays  
2. Contract emits event  
3. Listener detects  
4. Webhook triggers  
5. Hosting activated  
6. User sees “Active”  

---

## 4. Frontend

- React + Vite  
- Wallet connection  
- Token approval  
- `payHosting()` call  
- bDOI resolution  

---

## 5. AWS Managed Blockchain RPC

- Primary RPC endpoint  
- High reliability  
- IAM‑secured  
- No public RPC limits  

---

## 6. CI/CD

- Contracts: compile + deploy  
- Backend: Docker → ECR → ECS  
- Frontend: build → S3 → CloudFront  

---

## 7. Hosting Providers

Backend supports:

- cPanel  
- Plesk  
- Spaceship  
- Custom adapters  

Each implements:
activateHosting({ payer, planId })

---

## 8. Summary

TIPSPAY BLOCKC provides:

- On‑chain payments  
- Identity layer (bDOI)  
- Scalable backend  
- Modern frontend  
- Enterprise RPC  

LICENSE
MIT License

Copyright (c) 2025 TIPSPAY

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...



