import type { bookRepo } from "../repositories/book.repo";

type BookRepo = typeof bookRepo;
const PRICE_TYPES = ["RENT", "BUY"] as const;
type PriceType = (typeof PRICE_TYPES)[number];

export class BookService {
  constructor(private readonly bookRepo: BookRepo) {}

  /* ========== BOOK CRUD ========== */

  async create(title: string) {
    if (!title) {
      throw new Error("INVALID_INPUT");
    }

    const existing = await this.bookRepo.findBookByTitle(title);
    if (existing) {
      throw new Error("BOOK_ALREADY_EXISTS");
    }

    return this.bookRepo.createBook({ title });
  }

  async list() {
    return this.bookRepo.listBooks();
  }

  async deleteByTitle(title: string) {
    if (!title) {
      throw new Error("INVALID_TITLE");
    }

    return this.bookRepo.deleteBookByTitle(title);
  }

  async updateTitle(oldTitle: string, newTitle: string) {
    if (!oldTitle || !newTitle) {
      throw new Error("INVALID_INPUT");
    }

    const existing = await this.bookRepo.findBookByTitle(oldTitle);
    if (!existing) {
      throw new Error("BOOK_NOT_FOUND");
    }

    return this.bookRepo.updateBookTitle(oldTitle, newTitle);
  }

  /* ========== BOOKING ========== */

async bookingBook(
  bookId: number,
  storeId: number,
  amount: number,
  email: string,
  type: string
) {
  console.log("booking params:", {
    bookId,
    storeId,
    amount,
    email,
    type
  });

  const storeBook = await this.bookRepo.getStoreBook(storeId, bookId);
  console.log("storeBook:", storeBook);

  if (!storeBook) {
    throw new Error("BOOK_NOT_IN_STORE");
  }

  console.log("checking amount...");
  if (storeBook.amount < amount) {
    throw new Error("INSUFFICIENT_BOOK_AMOUNT");
  }

  console.log("calling repo booking...");
  return this.bookRepo.bookInStore(
    storeId,
    bookId,
    amount,
    type,
    email,
  );
}

  /* ========== SEARCH ========== */

  async searchBook(title: string, storeId?: number) {
    if (!title) {
      throw new Error("EMPTY_TITLE");
    }

    const result = await this.bookRepo.searchBooks(title, storeId);

    if (!result || result.length === 0) {
      throw new Error("BOOK_NOT_FOUND");
    }

    return result;
  }
}
