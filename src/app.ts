import express from "express";
import authRoutes from "./routes/auth";
import bookRoutes from "./routes/book.route";
import { requestIdMiddleware } from "../middleware/request-id.middleware";
import { errorMiddleware } from "../middleware/error.middleware";
import { logger } from "./utils/logger";

const app = express();

app.use(express.json());
app.use(requestIdMiddleware);

app.use("/auth", authRoutes);
app.use("/book", bookRoutes);
app.use(errorMiddleware);

app.listen(3000, () => {
  logger.info("Server started", {
    url: "http://localhost:3000",
    env: process.env.NODE_ENV,
  });
});
