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

export const requireRole = (roles: ("ADMIN" | "USER")[] ) => (req: Request, _res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (!user) {
      return _res.status(401).json({ message: "UNAUTHORIZED" });
    }

    if (!roles.includes(user.role)) {
      return _res.status(403).json({ message: "FORBIDDEN" });
    }

    next();

}
