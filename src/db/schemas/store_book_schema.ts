import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { books } from "./book_schema";
import { stores } from "./store_schema";

export const storeBooks = pgTable("store_books", {
  id: serial("id").primaryKey(),

  storeId: integer("store_id")
    .notNull()
    .references(() => stores.id),

  bookId: integer("book_id")
    .notNull()
    .references(() => books.id),

  amount: integer("amount").notNull(),
});