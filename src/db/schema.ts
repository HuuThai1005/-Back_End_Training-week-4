import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/* ================= USERS ================= */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("USER"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ================= BOOKS ================= */
export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
});

/* ================= REGIONS ================= */
export const regions = pgTable("regions", {
  id: serial("id").primaryKey(),
  region_name: text("region_name").notNull().unique(),
});

/* ================= STORES ================= */
export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  storeName: text("store_name").notNull(),
  regionId: integer("region_id")
    .notNull()
    .references(() => regions.id),
});

/* ========== STORE_BOOKS (KHO THEO STORE) ========== */
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

/* ================= PRICES ================= */
export const prices = pgTable("prices", {
  id: serial("id").primaryKey(),

  regionId: integer("region_id")
    .notNull()
    .references(() => regions.id),

  type: text("type").notNull(), 

  price: integer("price").notNull(),
});

/* ================= BOOKING HISTORY ================= */
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

