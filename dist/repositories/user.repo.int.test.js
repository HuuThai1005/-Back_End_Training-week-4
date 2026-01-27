"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const user_repo_1 = require("./user.repo");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
(0, vitest_1.describe)("userRepo (integration)", () => {
    (0, vitest_1.beforeEach)(async () => {
        // clean db before each test
        await db_1.db.delete(schema_1.users);
    });
    (0, vitest_1.it)("creates and finds user", async () => {
        const user = await user_repo_1.userRepo.create({
            email: "a@b.com",
            password: "secret",
        });
        const found = await user_repo_1.userRepo.findByEmail("a@b.com");
        (0, vitest_1.expect)(found?.email).toBe(user.email);
    });
});
