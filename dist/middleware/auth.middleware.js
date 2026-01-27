"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jwt_1 = require("../utils/jwt");
const app_error_1 = require("../errors/app.error");
function authMiddleware(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new app_error_1.AppError("UNAUTHORIZED", "Missing or invalid authorization header", 401);
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = (0, jwt_1.verifyToken)(token);
        req.user = payload;
        next();
    }
    catch {
        throw new app_error_1.AppError("INVALID_TOKEN", "Invalid token", 401);
    }
}
