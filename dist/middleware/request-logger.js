"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = requestLogger;
const crypto_1 = require("crypto");
const logger_1 = require("../utils/logger");
function requestLogger(req, res, next) {
    const requestId = (0, crypto_1.randomUUID)();
    req.requestId = requestId;
    const start = Date.now();
    res.on("finish", () => {
        logger_1.logger.info("HTTP request", {
            requestId,
            method: req.method,
            path: req.path,
            userId: req.user?.userId,
        });
    });
    next();
}
