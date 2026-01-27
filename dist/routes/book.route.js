"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_service_1 = require("../service/book.service");
const book_repo_1 = require("../repositories/book.repo");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const bookService = new book_service_1.BookService(book_repo_1.bookRepo);
/**
 * Create book (protected)
 */
router.post("/books-create", auth_middleware_1.authMiddleware, async (req, res, next) => {
    try {
        const { title, price } = req.body;
        await bookService.create(title, price, req.requestId);
        res.json({ message: "Create book success!" });
    }
    catch (err) {
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
router.delete("/books-delete", auth_middleware_1.authMiddleware, async (req, res, next) => {
    try {
        const { title } = req.body;
        await bookService.deleteByTitle(title, req.requestId);
        res.json({ message: "Deleted book success!" });
    }
    catch (err) {
        next(err);
    }
});
/**
 * Update book (protected)
 */
router.put("/books/:title", auth_middleware_1.authMiddleware, async (req, res, next) => {
    try {
        const oldTitle = String(req.params.title);
        const { title, price } = req.body;
        await bookService.updateByTitle(oldTitle, { title, price }, req.requestId);
        res.json({ message: "Update book success!" });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
