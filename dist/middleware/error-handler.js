"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const logger_1 = require("../utils/logger");
function errorHandler(err, req, res, _next) {
    logger_1.logger.error("Unhandled error", {
        requestId: req.requestId,
        message: err.message,
        stack: err.stack,
    });
    res.status(500).json({
        message: "Internal server error",
    });
}
