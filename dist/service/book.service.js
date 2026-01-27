"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
class BookService {
    constructor(bookRepo) {
        this.bookRepo = bookRepo;
    }
    async create(title, price, requestId) {
        if (!title || price === undefined) {
            throw new Error("INVALID_INPUT");
        }
        const existing = await this.bookRepo.findByTitle(title);
        if (existing) {
            throw new Error("BOOK_ALREADY_EXISTS");
        }
        return this.bookRepo.create({ title, price });
    }
    async list() {
        return this.bookRepo.listAll();
    }
    async deleteByTitle(title, requestId) {
        if (!title) {
            throw new Error("INVALID_TITLE");
        }
        return this.bookRepo.deleteByTitle(title);
    }
    async updateByTitle(oldTitle, data, requestId) {
        if (!oldTitle) {
            throw new Error("INVALID_TITLE");
        }
        if (data.title === undefined && data.price === undefined) {
            throw new Error("NOTHING_TO_UPDATE");
        }
        const existing = await this.bookRepo.findByTitle(oldTitle);
        if (!existing) {
            throw new Error("BOOK_NOT_FOUND");
        }
        return this.bookRepo.updateByTitle(oldTitle, data);
    }
}
exports.BookService = BookService;
