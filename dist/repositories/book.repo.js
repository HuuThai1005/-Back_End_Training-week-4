"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRepo = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.bookRepo = {
    async findById(id) {
        const result = await db_1.db.select().from(schema_1.books).where((0, drizzle_orm_1.eq)(schema_1.books.id, id));
        return result[0] ?? null;
    },
    async findByTitle(title) {
        const result = await db_1.db.select().from(schema_1.books).where((0, drizzle_orm_1.eq)(schema_1.books.title, title));
        return result[0] ?? null;
    },
    async create(data) {
        const resultBook = await db_1.db.insert(schema_1.books).values(data).returning();
        return resultBook[0];
    },
    async listAll() {
        const result = await db_1.db.select().from(schema_1.books);
        return result;
    },
    async deleteByTitle(title) {
        await db_1.db.delete(schema_1.books).where((0, drizzle_orm_1.eq)(schema_1.books.title, title));
    },
    async updateByTitle(oldTitle, data) {
        return db_1.db
            .update(schema_1.books)
            .set(data)
            .where((0, drizzle_orm_1.eq)(schema_1.books.title, oldTitle));
    }
};
