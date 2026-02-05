// scripts/deployHostingPayments.ts
import { ethers, upgrades } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const admin = process.env.HOSTING_ADMIN!;
  const treasury = process.env.HOSTING_TREASURY!;
  const initialTokens = (process.env.HOSTING_ALLOWED_TOKENS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!admin || !treasury) {
    throw new Error("HOSTING_ADMIN and HOSTING_TREASURY required");
  }

  const HostingPayments = await ethers.getContractFactory("HostingPaymentsUpgradeable");
  const proxy = await upgrades.deployProxy(
    HostingPayments,
    [admin, treasury, initialTokens],
    { kind: "uups" }
  );

  await proxy.deployed();

  console.log("HostingPayments proxy:", proxy.address);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
