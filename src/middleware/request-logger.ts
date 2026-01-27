import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import { logger } from "../utils/logger";


export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const requestId = randomUUID();
  (req as any).requestId = requestId;

  const start = Date.now();

  res.on("finish", () => {
    logger.info("HTTP request", {
    requestId,
    method: req.method,
    path: req.path,
    userId: (req as any).user?.userId,
    });
  });

  next();
}
