"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIdMiddleware = requestIdMiddleware;
const crypto_1 = require("crypto");
function requestIdMiddleware(req, _res, next) {
    req.requestId = (0, crypto_1.randomUUID)();
    next();
}
