import type { bookRepo } from "../repositories/book.repo";

type BookRepo = typeof bookRepo;

export class BookService {
  constructor(private readonly bookRepo: BookRepo) {}

  async create(title: string, price: number, requestId?: string) {
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

  async deleteByTitle(title: string, requestId?: string) {
    if (!title) {
      throw new Error("INVALID_TITLE");
    }

    return this.bookRepo.deleteByTitle(title);
  }

  async updateByTitle(
    oldTitle: string,
    data: { title?: string; price?: number },
    requestId?: string
  ) {
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

  async bookingBook(title: string, requestId?: string) {
    if (!title) {
      throw new Error("EMPTY_TITLE");
    }
    const existing = await this.bookRepo.findByTitle(title);
    if (!existing) {
      throw new Error("BOOK_NOT_FOUND");
    }
    const booked = existing.status === "BOOKED";
    if (booked) {
      throw new Error("BOOK_ALREADY_BOOKED");
    }
    return this.bookRepo.bookingBook(title);
}
}
