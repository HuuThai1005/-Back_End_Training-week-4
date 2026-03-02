import dotenv from "dotenv";

dotenv.config();
import express from "express";
import authRoutes from "./routes/auth/route"; ;
import bookRoutes from "./routes/book/route";
import userRoutes from "./routes/user/route";
import storeRoutes from "./routes/store/route";
import { requestIdMiddleware } from "./middleware/request-id.middleware";
import { errorMiddleware } from "./middleware/error.middleware";
import { logger } from "./utils/logger";


const app = express();

app.use(express.json());
app.use(requestIdMiddleware);

app.use("/auth", authRoutes);
app.use("/book", bookRoutes);
app.use("/user", userRoutes);
app.use("/store", storeRoutes);
app.use((err: any, req: any, res: any, next: any) => {
  console.error("GLOBAL ERROR:");
  console.error(err.stack);

  res.status(500).json({
    message: err.message,
  });
});
app.use(errorMiddleware);

app.listen(3000, () => {
  logger.info("Server started", {
    url: "http://localhost:3000",
    env: process.env.NODE_ENV,
  });
});
