import bcrypt from "bcrypt";
import { userRepo } from "../repositories/user.repo";
import { logger } from "../utils/logger";
import { AppError } from "../errors/app.error";
import { signToken } from "../utils/jwt";

export class UserService {
  constructor(private readonly repo: typeof userRepo) {}

  async register(email: string, password: string, requestId?: string) {
    logger.info("Register user", { requestId, email });

    if (!email || !password) {
      throw new AppError("INVALID_INPUT", "Invalid input", 400);
    }

    const existing = await this.repo.findByEmail(email);
    if (existing) {
      throw new AppError(
        "EMAIL_ALREADY_EXISTS",
        "Email already exists",
        400
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.repo.create({
      email,
      password: hashedPassword,
    });

    logger.info("User registered", {
      requestId,
      userId: user.id,
    });

    return user;
  }

  async login(email: string, password: string, requestId?: string) {
    logger.info("Login attempt", { requestId, email });

    const user = await this.repo.findByEmail(email);
    if (!user) {
      throw new AppError("INVALID_CREDENTIALS", "Invalid credentials", 401);
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      throw new AppError("INVALID_CREDENTIALS", "Invalid credentials", 401);
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
    });

    logger.info("Login success", {
      requestId,
      userId: user.id,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
