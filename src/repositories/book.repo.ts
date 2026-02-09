import { db } from "../db";
import {
  books,
  stores,
  storeBooks,
  prices,
  bookingHistory,
} from "../db/schema";
import { eq, and, like } from "drizzle-orm";

/* ================= BOOK ================= */

export const bookRepo = {
  async findBookById(id: number) {
    const result = await db.select().from(books).where(eq(books.id, id));
    return result[0] ?? null;
  },

  async findBookByTitle(title: string) {
    const result = await db.select().from(books).where(eq(books.title, title));
    return result[0] ?? null;
  },

  async createBook(data: { title: string }) {
    const result = await db.insert(books).values(data).returning();
    return result[0];
  },

  async listBooks() {
    return db.select().from(books);
  },

  async deleteBookByTitle(title: string) {
    return db.delete(books).where(eq(books.title, title));
  },

  async updateBookTitle(oldTitle: string, newTitle: string) {
    return db
      .update(books)
      .set({ title: newTitle })
      .where(eq(books.title, oldTitle));
  },

  /* ================= STORE BOOK ================= */

  async getStoreBook(storeId: number, bookId: number) {
    const result = await db
      .select()
      .from(storeBooks)
      .where(
        and(
          eq(storeBooks.storeId, storeId),
          eq(storeBooks.bookId, bookId),
        ),
      );

    return result[0] ?? null;
  },

  async bookInStore(
    storeId: number,
    bookId: number,
    amount: number,
    email: string,
  ) {
    return db.transaction(async (tx) => {
      const storeBook = await tx
        .select()
        .from(storeBooks)
        .where(
          and(
            eq(storeBooks.storeId, storeId),
            eq(storeBooks.bookId, bookId),
          ),
        )
        .then((r) => r[0]);

      if (!storeBook) throw new Error("BOOK_NOT_IN_STORE");

      await tx
        .update(storeBooks)
        .set({ amount: storeBook.amount - amount })
        .where(eq(storeBooks.id, storeBook.id));

      await tx.insert(bookingHistory).values({
        bookId,
        storeId,
        userEmail: email,
        bookingAmount: amount,
      });

      return true;
    });
  },

  /* ================= SEARCH ================= */

  async searchBooks(title: string, storeId?: number) {
    const condition = storeId
      ? and(
          like(books.title, `%${title}%`),
          eq(storeBooks.storeId, storeId),
        )
      : like(books.title, `%${title}%`);

    return db
      .select({
        bookId: books.id,
        title: books.title,
        storeId: storeBooks.storeId,
        amount: storeBooks.amount,
        price: prices.price,
        type: prices.type,
      })
      .from(books)
      .innerJoin(storeBooks, eq(storeBooks.bookId, books.id))
      .innerJoin(prices, eq(prices.bookId, books.id))
      .where(condition);
  },

  /* ================= HISTORY ================= */

  async getBookingHistory() {
    return db.select().from(bookingHistory);
  },

  async getBookingHistoryByEmail(email: string) {
    return db
      .select()
      .from(bookingHistory)
      .where(eq(bookingHistory.userEmail, email));
  },
};
