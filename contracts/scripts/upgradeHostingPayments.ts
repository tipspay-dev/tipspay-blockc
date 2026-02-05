// scripts/upgradeHostingPayments.ts
import { ethers, upgrades } from "hardhat";

async function main() {
  const proxyAddress = process.env.HOSTING_PROXY_ADDRESS!;
  if (!proxyAddress) throw new Error("HOSTING_PROXY_ADDRESS required");

  const HostingPayments = await ethers.getContractFactory("HostingPaymentsUpgradeable");
  const upgraded = await upgrades.upgradeProxy(proxyAddress, HostingPayments);
  await upgraded.deployed();

  console.log("HostingPayments upgraded at:", upgraded.address);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
