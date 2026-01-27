"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const request_id_middleware_1 = require("./middleware/request-id.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
const logger_1 = require("./utils/logger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(request_id_middleware_1.requestIdMiddleware);
app.use("/auth", auth_1.default);
app.use("/book", book_route_1.default);
app.use(error_middleware_1.errorMiddleware);
app.listen(3000, () => {
    logger_1.logger.info("Server started", {
        url: "http://localhost:3000",
        env: process.env.NODE_ENV,
    });
});
