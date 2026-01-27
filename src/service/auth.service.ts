import bcrypt from "bcrypt";
import type { userRepo } from "../repositories/user.repo";

type UserRepo = typeof userRepo;

export class AuthService {
  constructor(private readonly userRepo: UserRepo) {}

  async register(email: string, password: string) {
    if (!email || !password) {
      throw new Error("INVALID_INPUT");
    }

    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userRepo.create({
      email,
      password: hashedPassword,
    });
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("INVALID_CREDENTIALS");
    }

    return {
      id: user.id,
      email: user.email,
    };
  }
}
