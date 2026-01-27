"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const book_service_1 = require("../../src/service/book.service");
const mockBookRepo = {
    findByTitle: vitest_1.vi.fn(),
    create: vitest_1.vi.fn(),
    listAll: vitest_1.vi.fn(),
    deleteByTitle: vitest_1.vi.fn(),
    updateByTitle: vitest_1.vi.fn(),
};
(0, vitest_1.describe)("BookService", () => {
    let bookService;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        bookService = new book_service_1.BookService(mockBookRepo);
    });
    (0, vitest_1.describe)("create()", () => {
        (0, vitest_1.it)("should create book successfully", async () => {
            mockBookRepo.findByTitle.mockResolvedValue(null);
            mockBookRepo.create.mockResolvedValue({
                id: 1,
                title: "Clean Code",
                price: 100,
            });
            const result = await bookService.create("Clean Code", 100);
            (0, vitest_1.expect)(mockBookRepo.findByTitle).toHaveBeenCalledWith("Clean Code");
            (0, vitest_1.expect)(mockBookRepo.create).toHaveBeenCalledWith({
                title: "Clean Code",
                price: 100,
            });
            (0, vitest_1.expect)(result.title).toBe("Clean Code");
        });
        (0, vitest_1.it)("should throw error if book already exists", async () => {
            mockBookRepo.findByTitle.mockResolvedValue({ id: 1 });
            await (0, vitest_1.expect)(bookService.create("Clean Code", 100)).rejects.toThrow("BOOK_ALREADY_EXISTS");
        });
    });
    (0, vitest_1.describe)("list()", () => {
        (0, vitest_1.it)("should return all books", async () => {
            mockBookRepo.listAll.mockResolvedValue([
                { id: 1, title: "Book 1", price: 50 },
                { id: 2, title: "Book 2", price: 70 },
            ]);
            const result = await bookService.list();
            (0, vitest_1.expect)(mockBookRepo.listAll).toHaveBeenCalled();
            (0, vitest_1.expect)(result.length).toBe(2);
        });
    });
    (0, vitest_1.describe)("deleteByTitle()", () => {
        (0, vitest_1.it)("should delete book by title", async () => {
            mockBookRepo.deleteByTitle.mockResolvedValue(undefined);
            await bookService.deleteByTitle("Clean Code");
            (0, vitest_1.expect)(mockBookRepo.deleteByTitle).toHaveBeenCalledWith("Clean Code");
        });
        (0, vitest_1.it)("should throw error if title is empty", async () => {
            await (0, vitest_1.expect)(bookService.deleteByTitle("")).rejects.toThrow("INVALID_TITLE");
        });
    });
    (0, vitest_1.describe)("updateByTitle()", () => {
        (0, vitest_1.it)("should update book successfully", async () => {
            mockBookRepo.findByTitle.mockResolvedValue({
                id: 1,
                title: "Old Title",
                price: 50,
            });
            mockBookRepo.updateByTitle.mockResolvedValue(undefined);
            await bookService.updateByTitle("Old Title", {
                title: "New Title",
                price: 100,
            });
            (0, vitest_1.expect)(mockBookRepo.updateByTitle).toHaveBeenCalledWith("Old Title", {
                title: "New Title",
                price: 100,
            });
        });
        (0, vitest_1.it)("should throw error if book not found", async () => {
            mockBookRepo.findByTitle.mockResolvedValue(null);
            await (0, vitest_1.expect)(bookService.updateByTitle("Unknown", { title: "New" })).rejects.toThrow("BOOK_NOT_FOUND");
        });
        (0, vitest_1.it)("should throw error if nothing to update", async () => {
            await (0, vitest_1.expect)(bookService.updateByTitle("Clean Code", {})).rejects.toThrow("NOTHING_TO_UPDATE");
        });
    });
});
