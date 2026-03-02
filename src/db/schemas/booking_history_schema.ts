import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { books } from "./book_schema";
import { stores } from "./store_schema";
import { users } from "./users_schema";

export const bookingHistory = pgTable("booking_history", {
  id: serial("id").primaryKey(),

  bookId: integer("book_id")
    .notNull()
    .references(() => books.id),

  storeId: integer("store_id")
    .notNull()
    .references(() => stores.id),

  userEmail: text("user_email")
    .notNull()
    .references(() => users.email),

  bookingAmount: integer("booking_amount").notNull(),

  type: text("type").notNull(),     
  
  price: integer("price").notNull(), 

  bookedAt: timestamp("booked_at").defaultNow(),
});

