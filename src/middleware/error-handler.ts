import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";


export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error("Unhandled error", {
    requestId: (req as any).requestId,
    message: err.message,
    stack: err.stack,
  });

  res.status(500).json({
    message: "Internal server error",
  });
}
