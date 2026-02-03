import bcrypt from "bcrypt";
import { userRepo } from "../repositories/user.repo";
import { logger } from "../utils/logger";
import { AppError } from "../errors/app.error";
import { signToken } from "../utils/jwt";

export class UserService {
  constructor(private readonly repo: typeof userRepo) {}

  async register(email: string, password: string) {
      if (!email || !password) {
        throw new Error("INVALID_INPUT");
      }
  
      const existing = await this.repo.findByEmail(email);
      if (existing) {
        throw new Error("EMAIL_ALREADY_EXISTS");
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      return this.repo.create({
        email,
        password: hashedPassword,
      });
    }
  
    async login(email: string, password: string) {
      const user = await this.repo.findByEmail(email);
      if (!user) {
        throw new Error("INVALID_CREDENTIALS");
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("PASSWORD_INCORRECT");
      }

      const token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
  return {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
  }
    }

  async changePassword(email: string, oldPass: string, newPass: string) {
  const user = await this.repo.findByEmail(email);
  if (!user) {
    throw new AppError("USER_NOT_FOUND", "User not found", 404);
  }

  const isMatch = await bcrypt.compare(oldPass, user.password);
  if (!isMatch) throw new AppError("INVALID_PASSWORD", "Wrong password", 400);

  const hashed = await bcrypt.hash(newPass, 10);
  await this.repo.changePassword(user.id, hashed);

   return { success: true };
}

async listAllUsers() {
  const users = await this.repo.listAllUsers();
  return users;
}
}
