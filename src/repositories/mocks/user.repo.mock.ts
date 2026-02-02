import { vi } from "vitest";
import type { CreateUserInput } from "../user.repo";

export const createUserRepoMock = () => ({
  findByEmail: vi.fn<
    (email: string) => Promise<any | null>
  >(),

  findById: vi.fn<
    (id: number) => Promise<any | null>
  >(),

  create: vi.fn<
    (data: CreateUserInput) => Promise<any>
  >(),

  changePassword: vi.fn<
    (userId: number, hashedPassword: string) => Promise<void>
  >(),

  listAllUsers: vi.fn<
    () => Promise<any[]>
  >(),
});
