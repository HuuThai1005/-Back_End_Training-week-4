"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const vitest_2 = require("vitest");
(0, vitest_1.afterEach)(() => {
    vitest_2.vi.clearAllMocks();
});
