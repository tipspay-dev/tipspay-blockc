// middleware/verifyHmac.ts
import { Request, Response, NextFunction } from "express";

export function verifyHmac(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // ...
  next();
}

