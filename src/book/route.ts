import { Router } from "express";
import { BookService } from "../service/book.service";
import { bookRepo } from "../repositories/book.repo";
import { authMiddleware, requireRole } from "../middleware/auth.middleware";
import { users } from "../db/schema";
import { title } from "process";

const router = Router();
const bookService = new BookService(bookRepo);

/**
 * Create book (protected)
 */
router.post("/books-create", authMiddleware, requireRole(["ADMIN"]), async (req, res, next) => {
    try {
      const { title } = req.body;
      await bookService.create(title);
      res.json({ message: "Create book success!" });
    } catch (err) {
      next(err);
    }
  }
);


/**
 * List books (public)
 */
router.get("/books", async (_req, res, next) => {
  try {
    const books = await bookService.list();
    res.json({ books });
  } catch (err) {
    next(err);
  }
});


/**
 * Delete book (protected)
 */
router.delete("/books-delete/:title", authMiddleware, requireRole(["ADMIN"]), async (req, res, next) => {
   try {
      const title = String(req.params.title);
      await bookService.deleteByTitle(title);
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
      const { title } = req.body;
      const oldTitle = String(req.params.title);

      await bookService.updateTitle(oldTitle, title);
      res.json({ message: "Update book success!" });
    } catch (err) {
      next(err);
    }
});

router.post("/books-booking", authMiddleware, requireRole(["ADMIN","USER"]), async (req, res, next) => {
  try {
    console.log("=== BOOKING REQUEST ===");
    console.log("body:", req.body);
    console.log("user:", (req as any).user);

    const { bookId, storeId, amount, type } = req.body;
    const email = (req as any).user.email;

    await bookService.bookingBook(
      Number(bookId),
      Number(storeId),
      Number(amount),
      email,
      type,
    );

    res.json({ message: "Booked book success!" });
  } catch (err: any) {
    console.error("BOOKING ERROR:", err); 
    next(err);
  }
});

router.get("/booking-history", authMiddleware, requireRole(["ADMIN","USER"]), async (req, res, next) => {
    try {
      const user = (req as any).user;
      const history =
        user.role === "ADMIN"
          ? await bookRepo.getBookingHistory()
          : await bookRepo.getBookingHistoryByEmail(user.email);

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
