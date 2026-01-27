import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export type CreateUserInput = {
    email: string
    password: string 
}

export const userRepo = {
    async findByEmail(email: string) {
        const result = await db.select().from(users).where(eq(users.email, email)).limit(1)
        return result[0] ?? null

    },

    async findById(id: number) {
        const result = await db.select().from(users).where(eq(users.id, id)).limit(1)
        return result[0] ?? null
    },

    async create(data: CreateUserInput) {
    const result = await db.insert(users).values(data).returning()
    return result[0]
}
}
