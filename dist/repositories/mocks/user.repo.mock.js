"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRepoMock = void 0;
const vitest_1 = require("vitest");
const createUserRepoMock = () => ({
    findByEmail: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    create: vitest_1.vi.fn(),
});
exports.createUserRepoMock = createUserRepoMock;
