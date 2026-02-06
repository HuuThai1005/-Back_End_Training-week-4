import { Router } from "express";
import { BookService } from "../service/book.service";
import { bookRepo } from "../repositories/book.repo";
import { authMiddleware, requireRole } from "../middleware/auth.middleware";
import { users } from "../db/schema";

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

router.post("/books-booking", authMiddleware, requireRole(["ADMIN","USER"]), async (req, res, next) => {
  try {
    const title = String(req.body.title);
    const amount = Number(req.body.amount);
    const email = (req as any).user.email;
    await bookService.bookingBook(title, amount, email,(req as any).requestId);
    res.json({ message: "Booked book success!" });
  } catch (err: any) {
    if (err.message === "EMPTY_TITLE") {
      return res.status(404).json({ message: "Title is empty" });
    }
    if (err.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({ message: "Book not found" });
    }
    if (err.message === "BOOK_SOLD_OUT") {
      return res.status(400).json({ message: "Book is sold out" });
    }
    if (err.message === "INSUFFICIENT_BOOK_AMOUNT") {
      return res.status(400).json({ message: "Insufficient book amount" });
    }
    if (err.message === "INVALID_BOOKING_AMOUNT") {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }
  }
});

router.get("/booking-history", authMiddleware, requireRole(["ADMIN","USER"]), async (req, res, next) => {
    try {
      const user = (req as any).user;

      const history = user.role === "ADMIN" ? await bookRepo.getBookingHistory(): await bookRepo.getBookingHistoryByEmail(user.email);
      res.json({ history });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/search", async ( req, res, next) => {
  try {
    const title = String(req.body.title);
    const books = await bookService.searchBook(title);
    res.json({ books });
  } catch (err: any) {
    if (err.message === "EMPTY_TITLE") {
      return res.status(404).json({ message: "Title is empty" });
    }
    if (err.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({ message: "Book not found" });
    }
}
});


export default router;
