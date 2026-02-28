import { db } from "../db";
import { stores } from "../db/schema";
import { storeBooks } from "../db/schema";
import { eq, and } from "drizzle-orm";

export const storeRepo = {
  async findStoreByName(storeName: string) {
    const result = await db.select().from(stores).where(eq(stores.storeName, storeName));
    return result[0] ?? null;
  },
  async findBookById(storeId: number, bookId: number) {
    const result = await db.select().from(storeBooks).where(and(eq(storeBooks.storeId, storeId), eq(storeBooks.bookId, bookId)));
    return result[0] ?? null;
  },
    async createStore(data: { storeName: string, regionId: number }) {
    const result = await db.insert(stores).values(data).returning();
    return result[0];
  },
    async addBookToStore(data: { storeId: number; bookId: number; amount: number }) {
    const result = await db.insert(storeBooks).values(data).returning();
    return result[0];
  },
    async getAllStores() {
    const result = await db.select().from(stores);
    return result;
  },
   async getAllStoreBooks(storeId: number) {
    const result = await db.select().from(storeBooks).where(eq(storeBooks.storeId, storeId));
    return result;
  }
}