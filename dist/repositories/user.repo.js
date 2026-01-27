"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepo = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.userRepo = {
    async findByEmail(email) {
        const result = await db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, email)).limit(1);
        return result[0] ?? null;
    },
    async findById(id) {
        const result = await db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id)).limit(1);
        return result[0] ?? null;
    },
    async create(data) {
        const result = await db_1.db.insert(schema_1.users).values(data).returning();
        return result[0];
    }
};
