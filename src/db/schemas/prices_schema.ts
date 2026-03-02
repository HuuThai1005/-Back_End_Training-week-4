import {
  integer,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { regions } from "./region_schema";

export const prices = pgTable("prices", {
  id: serial("id").primaryKey(),

  regionId: integer("region_id")
    .notNull()
    .references(() => regions.id),

  type: text("type").notNull(), 

  price: integer("price").notNull(),
});