import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error";

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

  
}
