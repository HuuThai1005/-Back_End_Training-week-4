import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error";
import { logger } from "../utils/logger";


export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const requestId = (req as any).requestId;

  if (err instanceof AppError) {
    logger.warn("App error", {
      requestId,
      code: err.code,
      message: err.message,
      path: req.path,
      method: req.method,
    });

    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
    });
  }

  logger.error("Unhandled error", {
    requestId,
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  res.status(500).json({
    message: "Internal server error",
  });
}
