import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error";
import { verifyToken } from "../utils/jwt";

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError(
      "UNAUTHORIZED",
      "You must be log in!",
      401,
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);
    (req as any).user = payload;

    next();
  } catch (err) {
    return next(new AppError("UNAUTHORIZED", "Invalid or expired token", 401));
  }
}

export const requireRole =
  (roles: ("ADMIN" | "USER")[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return next(new AppError("UNAUTHORIZED", "Not authenticated", 401));
    }

    if (!roles.includes(user.role)) {
      return next(new AppError("FORBIDDEN", "You do not have permission", 403));
    }

    next();
  };
