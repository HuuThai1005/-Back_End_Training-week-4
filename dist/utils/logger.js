"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
function log(level, message, meta) {
    const logEntry = {
        level,
        message,
        time: new Date().toISOString(),
        ...meta,
    };
    if (level === "error") {
        console.error(logEntry);
    }
    else {
        console.log(logEntry);
    }
}
exports.logger = {
    info: (message, meta) => log("info", message, meta),
    warn: (message, meta) => log("warn", message, meta),
    error: (message, meta) => log("error", message, meta),
};
