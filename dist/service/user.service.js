"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_1 = require("../utils/logger");
const app_error_1 = require("../errors/app.error");
const jwt_1 = require("../utils/jwt");
class UserService {
    constructor(repo) {
        this.repo = repo;
    }
    async register(email, password, requestId) {
        logger_1.logger.info("Register user", { requestId, email });
        if (!email || !password) {
            throw new app_error_1.AppError("INVALID_INPUT", "Invalid input", 400);
        }
        const existing = await this.repo.findByEmail(email);
        if (existing) {
            throw new app_error_1.AppError("EMAIL_ALREADY_EXISTS", "Email already exists", 400);
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await this.repo.create({
            email,
            password: hashedPassword,
        });
        logger_1.logger.info("User registered", {
            requestId,
            userId: user.id,
        });
        return user;
    }
    async login(email, password, requestId) {
        logger_1.logger.info("Login attempt", { requestId, email });
        const user = await this.repo.findByEmail(email);
        if (!user) {
            throw new app_error_1.AppError("INVALID_CREDENTIALS", "Invalid credentials", 401);
        }
        const ok = await bcrypt_1.default.compare(password, user.password);
        if (!ok) {
            throw new app_error_1.AppError("INVALID_CREDENTIALS", "Invalid credentials", 401);
        }
        const token = (0, jwt_1.signToken)({
            userId: user.id,
            email: user.email,
        });
        logger_1.logger.info("Login success", {
            requestId,
            userId: user.id,
        });
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
            },
        };
    }
}
exports.UserService = UserService;
