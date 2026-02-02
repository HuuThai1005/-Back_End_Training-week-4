import { Router } from "express";
import { BookService } from "../service/book.service";
import { bookRepo } from "../repositories/book.repo";
import { authMiddleware, requireRole } from "../middleware/auth.middleware";
import { fakeAuth } from "../middleware/fakeAuth.middelware";

const router = Router();
const bookService = new BookService(bookRepo);

/**
 * Create book (protected)
 */
router.post("/books-create", authMiddleware ,requireRole(["ADMIN"]), async (req, res, next) => {
  try {
    const { title, price } = req.body;
    await bookService.create(title, price, (req as any).requestId);
    res.json({ message: "Create book success!" });
  } catch (err) {
    next(err);
  }
});

/**
 * List books (public)
 */
router.get("/books", async (_req, res) => {
  const books = await bookService.list();
  res.json({ books });
});

/**
 * Delete book (protected)
 */
router.delete("/books-delete", authMiddleware, requireRole(["ADMIN"]), async (req, res, next) => {
  try {
    const { title } = req.body;
    await bookService.deleteByTitle(title, (req as any).requestId);
    res.json({ message: "Deleted book success!" });
  } catch (err) {
    next(err);
  }
});

/**
 * Update book (protected)
 */
router.put("/books/:title", authMiddleware, requireRole(["ADMIN"]), async (req, res, next) => {
  try {
    const oldTitle = String(req.params.title);
    const { title, price } = req.body;

    await bookService.updateByTitle(
      oldTitle,
      { title, price },
      (req as any).requestId
    );

    res.json({ message: "Update book success!" });
  } catch (err) {
    next(err);
  }
});

export default router;
