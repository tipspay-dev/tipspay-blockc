import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with:", deployer.address);

  const TPSC = await ethers.getContractFactory("TPSC");
  const tpsc = await TPSC.deploy();
  await tpsc.waitForDeployment();

  const Registry = await ethers.getContractFactory("bDOIRegistry");
  const registry = await Registry.deploy();
  await registry.waitForDeployment();

  const Hosting = await ethers.getContractFactory("HostingPayments");
  const hosting = await Hosting.deploy(deployer.address);
  await hosting.waitForDeployment();

  console.log("TPSC:", await tpsc.getAddress());
  console.log("bDOIRegistry:", await registry.getAddress());
  console.log("HostingPayments:", await hosting.getAddress());
}

main();

