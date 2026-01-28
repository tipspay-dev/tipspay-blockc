# TIPSPAY BLOCKC – System Architecture

This document describes the full end‑to‑end architecture of the TIPSPAY BLOCKC ecosystem, including smart contracts, backend services, frontend flows, and AWS infrastructure.

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

Kod

---

## 2. Components

### 2.1 Smart Contracts

#### **TPSC.sol**
ERC‑20 token used for payments inside the Tipspay ecosystem.

#### **bDOIRegistry.sol**
Blockchain Digital Object Identifier registry.  
Provides canonical identity for smart contracts and digital assets.

#### **HostingPayments.sol**
Handles hosting plan payments using TPSC or USDT.  
Emits:

event HostingPaid(
address payer,
string planId,
address token,
uint256 amount,
string metadataCid
);

Kod

---

## 3. Backend (Event‑Driven Activation Service)

### Responsibilities

- Connect to AWS Managed Blockchain RPC  
- Listen for `HostingPaid` events  
- Generate HMAC‑signed webhook payloads  
- Call `/api/hosting/activate`  
- Activate hosting via:
  - cPanel API  
  - Plesk API  
  - Spaceship API  
- Store subscription data in DB

### Flow

1. User pays on‑chain  
2. Contract emits `HostingPaid`  
3. Backend listener detects event  
4. Backend sends HMAC‑signed webhook  
5. Hosting provider API activates the plan  
6. User sees “Active” status

---

## 4. Frontend (React Payment Interface)

### Features

- Hosting plan selection  
- Wallet connection (MetaMask / WalletConnect)  
- Token approval + payment  
- bDOI identity resolution  
- ethers.js contract interactions

### Payment Flow

1. User selects plan  
2. Approves token spending  
3. Calls `payHosting()`  
4. Transaction is sent via AWS RPC  
5. Backend handles activation

---

## 5. AWS Managed Blockchain RPC

Used as the primary RPC endpoint for:

- Contract reads  
- Contract writes  
- Event streaming  
- Backend listener stability

### Benefits

- Enterprise‑grade uptime  
- High throughput  
- Secure IAM‑controlled access  
- No public RPC limitations

---

## 6. CI/CD Pipeline (GitHub Actions)

### Includes:

- Smart contract compile + deploy  
- Backend Docker build + push to ECR  
- ECS service update  
- Frontend build + deploy to S3  
- CloudFront invalidation  

Pipeline files are located in:

.github/workflows/

Kod

---

## 7. Hosting Provider Integrations

Backend supports modular activation adapters:

- `cPanel`
- `Plesk`
- `Spaceship`
- Custom providers

Each provider implements:

activateHosting({ payer, planId })

Kod

---

## 8. Summary

TIPSPAY BLOCKC provides:

- A unified on‑chain payment system  
- A verifiable identity layer (bDOI)  
- A scalable backend activation engine  
- A modern frontend payment UI  
- Enterprise‑grade RPC infrastructure  

This architecture is designed for production envi

