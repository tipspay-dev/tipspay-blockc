import crypto from "crypto";
import env from "../config/env";

export function verifyHmac(req, res, next) {
  const signature = req.header("x-webhook-signature");
  const hmac = crypto.createHmac("sha256", env.WEBHOOK_SECRET).update(JSON.stringify(req.body)).digest("hex");

  if (hmac !== signature) return res.status(401).json({ error: "Invalid signature" });
  next();
}

