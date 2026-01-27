"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const user_service_1 = require("./user.service");
const user_repo_mock_1 = require("../repositories/mocks/user.repo.mock");
(0, vitest_1.describe)("UserService", () => {
    (0, vitest_1.it)("registers new user", async () => {
        const repo = (0, user_repo_mock_1.createUserRepoMock)();
        repo.findByEmail.mockResolvedValue(null);
        repo.create.mockResolvedValue({
            id: 1,
            email: "test@example.com",
        });
        const service = new user_service_1.UserService(repo);
        const user = await service.register("test@example.com", "password");
        (0, vitest_1.expect)(user.email).toBe("test@example.com");
    });
    (0, vitest_1.it)("throws if email already exists", async () => {
        const repo = (0, user_repo_mock_1.createUserRepoMock)();
        repo.findByEmail.mockResolvedValue({ id: 1 });
        const service = new user_service_1.UserService(repo);
        await (0, vitest_1.expect)(service.register("test@example.com", "password")).rejects.toThrow("EMAIL_ALREADY_EXISTS");
    });
});
