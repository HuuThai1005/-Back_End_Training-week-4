import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../src/utils/jwt";
import { AppError } from "../src/errors/app.error";

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("UNAUTHORIZED","Missing or invalid authorization header", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);
    (req as any).user = payload;
    next();
  } catch {
    throw new AppError("INVALID_TOKEN", "Invalid token", 401);
  }
}
