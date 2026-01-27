"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("../service/user.service");
const user_repo_1 = require("../repositories/user.repo");
const router = (0, express_1.Router)();
const userService = new user_service_1.UserService(user_repo_1.userRepo);
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        await userService.register(email, password);
        res.json({ message: "Register success" });
    }
    catch (err) {
        if (err.message === "EMAIL_ALREADY_EXISTS") {
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(400).json({ message: "Invalid input" });
    }
});
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await userService.login(email, password, req.requestId);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
