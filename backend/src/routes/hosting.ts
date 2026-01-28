import { ethers } from "ethers";
import axios from "axios";
import crypto from "crypto";
import env from "./config/env";
import HostingPaymentsAbi from "../abi/HostingPayments.json";

const provider = new ethers.JsonRpcProvider(env.RPC_URL);
const contract = new ethers.Contract(env.HOSTING_CONTRACT, HostingPaymentsAbi, provider);

contract.on("HostingPaid", async (payer, planId, token, amount, metadataCid) => {
  const body = { payer, planId, token, amount: amount.toString(), metadataCid };
  const signature = crypto.createHmac("sha256", env.WEBHOOK_SECRET).update(JSON.stringify(body)).digest("hex");

  await axios.post(env.WEBHOOK_URL, body, {
    headers: { "x-webhook-signature": signature }
  });
});

