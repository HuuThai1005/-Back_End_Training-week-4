import { describe, it, expect, vi, beforeEach } from "vitest";
import { BookService } from "../service/book/book.service";

const mockBookRepo = {
  findByTitle: vi.fn(),
  create: vi.fn(),
  listAll: vi.fn(),
  deleteByTitle: vi.fn(),
  updateByTitle: vi.fn(),
};

describe("BookService", () => {
  let bookService: BookService;

  beforeEach(() => {
    vi.clearAllMocks();
    bookService = new BookService(mockBookRepo as any);
  });

  describe("create()", () => {
    it("should create book successfully", async () => {
      mockBookRepo.findByTitle.mockResolvedValue(null);
      mockBookRepo.create.mockResolvedValue({
        id: 1,
        title: "Clean Code",
        price: 100,
      });

      const result = await bookService.create("Clean Code", 100);

      expect(mockBookRepo.findByTitle).toHaveBeenCalledWith("Clean Code");
      expect(mockBookRepo.create).toHaveBeenCalledWith({
        title: "Clean Code",
        price: 100,
      });
      expect(result.title).toBe("Clean Code");
    });

    it("should throw error if book already exists", async () => {
      mockBookRepo.findByTitle.mockResolvedValue({ id: 1 });

      await expect(
        bookService.create("Clean Code", 100)
      ).rejects.toThrow("BOOK_ALREADY_EXISTS");
    });
  });

  describe("list()", () => {
    it("should return all books", async () => {
      mockBookRepo.listAll.mockResolvedValue([
        { id: 1, title: "Book 1", price: 50 },
        { id: 2, title: "Book 2", price: 70 },
      ]);

      const result = await bookService.list();

      expect(mockBookRepo.listAll).toHaveBeenCalled();
      expect(result.length).toBe(2);
    });
  });

  describe("deleteByTitle()", () => {
    it("should delete book by title", async () => {
      mockBookRepo.deleteByTitle.mockResolvedValue(undefined);

      await bookService.deleteByTitle("Clean Code");

      expect(mockBookRepo.deleteByTitle).toHaveBeenCalledWith("Clean Code");
    });

    it("should throw error if title is empty", async () => {
      await expect(
        bookService.deleteByTitle("")
      ).rejects.toThrow("INVALID_TITLE");
    });
  });

  describe("updateByTitle()", () => {
    it("should update book successfully", async () => {
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

      expect(mockBookRepo.updateByTitle).toHaveBeenCalledWith("Old Title", {
        title: "New Title",
        price: 100,
      });
    });

    it("should throw error if book not found", async () => {
      mockBookRepo.findByTitle.mockResolvedValue(null);

      await expect(
        bookService.updateByTitle("Unknown", { title: "New" })
      ).rejects.toThrow("BOOK_NOT_FOUND");
    });

    it("should throw error if nothing to update", async () => {
      await expect(
        bookService.updateByTitle("Clean Code", {})
      ).rejects.toThrow("NOTHING_TO_UPDATE");
    });
  });
});
