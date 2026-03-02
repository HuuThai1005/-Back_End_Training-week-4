import {
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const regions = pgTable("regions", {
  id: serial("id").primaryKey(),
  region_name: text("region_name").notNull().unique(),
});