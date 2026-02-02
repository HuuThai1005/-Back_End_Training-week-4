import { describe, it, expect, beforeEach } from "vitest";
import { userRepo } from "../repositories/user.repo";
import { db } from "../db";
import { users } from "../db/schema";

describe("userRepo (integration)", () => {
  beforeEach(async () => {
    // clean db before each test
    await db.delete(users);
  });

  it("creates and finds user", async () => {
    const user = await userRepo.create({
      email: "a@b.com",
      password: "secret",
    });

    const found = await userRepo.findByEmail("a@b.com");
    expect(found?.email).toBe(user.email);
  });
});
