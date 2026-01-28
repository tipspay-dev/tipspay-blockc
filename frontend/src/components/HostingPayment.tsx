import React, { useState } from "react";
import { ethers } from "ethers";
import plans from "../plans.json";

export default function HostingPayment() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  async function pay() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const amount = ethers.parseUnits(selectedPlan.priceUsd.toString(), 6);

    const token = new ethers.Contract(import.meta.env.VITE_USDT, ["function approve(address,uint256)"], signer);
    const contract = new ethers.Contract(import.meta.env.VITE_HOSTING_CONTRACT, ["function payHosting(string,address,uint256,string)"], signer);

    await token.approve(import.meta.env.VITE_HOSTING_CONTRACT, amount);
    await contract.payHosting(selectedPlan.id, import.meta.env.VITE_USDT, amount, "ipfs://metadata");
  }

  return (
    <div>
      {plans.plans.map(p => (
        <button key={p.id} onClick={() => setSelectedPlan(p)}>
          {p.name} – ${p.priceUsd}
        </button>
      ))}

      {selectedPlan && <button onClick={pay}>Pay with USDT</button>}
    </div>
  );
}
