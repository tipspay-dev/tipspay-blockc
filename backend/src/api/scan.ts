import { Router } from "express";
import { httpProvider } from "../blockchain/provider";

export const scanRouter = Router();

scanRouter.get("/health", async (_req, res) => {
  const block = await httpProvider.getBlockNumber();
  res.json({ ok: true, block });
});
