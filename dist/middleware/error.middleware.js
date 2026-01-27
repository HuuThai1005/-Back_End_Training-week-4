"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const app_error_1 = require("../errors/app.error");
const logger_1 = require("../utils/logger");
function errorMiddleware(err, req, res, _next) {
    const requestId = req.requestId;
    if (err instanceof app_error_1.AppError) {
        logger_1.logger.warn("App error", {
            requestId,
            code: err.code,
            message: err.message,
            path: req.path,
            method: req.method,
        });
        return res.status(err.statusCode).json({
            code: err.code,
            message: err.message,
        });
    }
    logger_1.logger.error("Unhandled error", {
        requestId,
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
    });
    res.status(500).json({
        message: "Internal server error",
    });
}
