import {
  integer,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { regions } from "./region_schema";

export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  storeName: text("store_name").notNull(),
  regionId: integer("region_id")
    .notNull()
    .references(() => regions.id),
});