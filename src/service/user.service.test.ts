import { describe, it, expect } from "vitest";
import { UserService } from "./user.service";
import { createUserRepoMock } from "../repositories/mocks/user.repo.mock";

describe("UserService", () => {
  it("registers new user", async () => {
    const repo = createUserRepoMock();

    repo.findByEmail.mockResolvedValue(null);
    repo.create.mockResolvedValue({
      id: 1,
      email: "test@example.com",
    });

    const service = new UserService(repo);
    const user = await service.register("test@example.com", "password");

    expect(user.email).toBe("test@example.com");
  });

  it("throws if email already exists", async () => {
    const repo = createUserRepoMock();
    repo.findByEmail.mockResolvedValue({ id: 1 });

    const service = new UserService(repo);

    await expect(
      service.register("test@example.com", "password")
    ).rejects.toThrow("EMAIL_ALREADY_EXISTS");
  });
});
