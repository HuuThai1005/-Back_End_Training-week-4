"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.books = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.books = (0, pg_core_1.pgTable)("books", {
    id: (0, pg_core_1.serial)("id").primaryKey().unique(),
    title: (0, pg_core_1.text)("title").notNull(),
    price: (0, pg_core_1.serial)("price").notNull()
});
