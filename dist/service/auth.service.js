"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async register(email, password) {
        if (!email || !password) {
            throw new Error("INVALID_INPUT");
        }
        const existing = await this.userRepo.findByEmail(email);
        if (existing) {
            throw new Error("EMAIL_ALREADY_EXISTS");
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        return this.userRepo.create({
            email,
            password: hashedPassword,
        });
    }
    async login(email, password) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new Error("INVALID_CREDENTIALS");
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error("INVALID_CREDENTIALS");
        }
        return {
            id: user.id,
            email: user.email,
        };
    }
}
exports.AuthService = AuthService;
