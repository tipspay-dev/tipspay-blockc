# TIPSPAY BLOCKC

TIPSPAY BLOCKC, TPSC tokeni, bDOI kimlik sistemi ve hosting ödeme altyapısını birleştiren uçtan uca blockchain ekosistemidir.

Bu repo üç ana bileşenden oluşur:

- `contracts/` – TPSC, bDOIRegistry, HostingPayments akıllı kontratları
- `backend/` – Event listener, HMAC webhook, hosting aktivasyon servisi
- `frontend/` – React tabanlı ödeme arayüzü

Detaylı mimari için: `architecture.md`
# TIPSPAY BLOCKC

TIPSPAY BLOCKC is an end‑to‑end blockchain infrastructure that powers the Tipspay ecosystem.  
It combines the TPSC token, the bDOI identity standard, and an on‑chain hosting payment system into a unified, production‑ready architecture.

This monorepo contains three main components:

## 📂 Repository Structure

- **contracts/**  
  Smart contracts for TPSC, bDOIRegistry, and HostingPayments.  
  Built with Hardhat and deployed via AWS Managed Blockchain or any EVM-compatible network.

- **backend/**  
  Node.js service responsible for:
  - Listening to on‑chain `HostingPaid` events  
  - Verifying HMAC‑signed webhooks  
  - Activating hosting plans via external providers (cPanel, Plesk, Spaceship, etc.)

- **frontend/**  
  React-based payment interface that allows users to:
  - Select hosting plans  
  - Pay with TPSC or USDT  
  - Interact with smart contracts via ethers.js

## 📄 Documentation

For the full system architecture, see:  
**`architecture.md`**

## 🚀 Features

- On‑chain hosting payments  
- TPSC token integration  
- bDOI (Blockchain Digital Object Identifier) registry  
- Event-driven backend activation flow  
- AWS Managed Blockchain RPC support  
- Modular monorepo structure  
- CI/CD ready (GitHub Actions)

## 🛠️ Tech Stack

- Solidity (Hardhat)
- Node.js + Express
- React + Vite
- ethers.js
- AWS Managed Blockchain
- Docker (optional)
- GitHub Actions CI/CD

## 📜 License

developer@tipspay.org

MIT License

