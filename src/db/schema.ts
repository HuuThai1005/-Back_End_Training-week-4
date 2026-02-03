import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("USER"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const books = pgTable("books", {
  id: serial("id").primaryKey().unique(),
  title: text("title").notNull(),
  price: integer("price").notNull(), 
  status: text("status").notNull().default("AVAILABLE"),
  amount: integer("amount").notNull().default(10),
})

export const bookingHistory = pgTable("booking_history", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id").notNull().references(() => books.id),
  userEmail: text("user_email").notNull().references(() => users.email),
  bookingAmount: integer("booking_amount").notNull(),
  bookedAt: timestamp("booked_at").defaultNow(),
});
