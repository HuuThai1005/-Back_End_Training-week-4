import { db } from "../db";
import { books } from "../db/schema";
import { eq } from "drizzle-orm";
import { bookingHistory } from "../db/schema";
import { users } from "../db/schema";

export type CreateBookInput = {
  title: string;
  price: number;
  requestId?: string;
};

export type UpdateBookInput = {
  title?: string;
  price?: number;
  status?: string;
};

export const bookRepo = {
  async findById(id: number) {
    const result = await db.select().from(books).where(eq(books.id, id));
    return result[0] ?? null;
  },

  async findByTitle(title: string) {
    const result = await db.select().from(books).where(eq(books.title, title));
    return result[0] ?? null;
  },

  async create(data: CreateBookInput) {
    const resultBook = await db.insert(books).values(data).returning();
    return resultBook[0];
  },

  async listAll() {
    const result = await db.select().from(books);
    return result;
  },

  async deleteByTitle(title: string) {
    await db.delete(books).where(eq(books.title, title));
  },

  async updateByTitle(oldTitle: string, data: UpdateBookInput) {
    return db.update(books).set(data).where(eq(books.title, oldTitle));
  },

  async bookingBook(title: string, amount: number, email: string) {
    const book = await this.findByTitle(title);
    await db
      .update(books)
      .set({
        amount: book.amount - amount,
        status: book.amount - amount === 0 ? "SOLD_OUT" : "AVAILABLE",
      })
      .where(eq(books.id, book.id));
    await db.insert(bookingHistory).values({
      bookId: book.id,
      userEmail: email,
      bookingAmount: amount,
    });

    return true;
  },
  async getBookingHistory() {
    const result = await db.select().from(bookingHistory);
    return result;
  },
  async getBookingHistoryByEmail(email: string) {
    return db
      .select()
      .from(bookingHistory)
      .where(eq(bookingHistory.userEmail, email));
  },
  async searchBooksByTitle(title: string) {
    return db.select().from(books).where(eq(books.title, title));
  }
};
