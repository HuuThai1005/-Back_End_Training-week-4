CREATE TABLE "prices" (
	"id" serial PRIMARY KEY NOT NULL,
	"region_id" integer NOT NULL,
	"book_id" integer NOT NULL,
	"type" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "regions" (
	"id" serial PRIMARY KEY NOT NULL,
	"region_name" text NOT NULL,
	CONSTRAINT "regions_region_name_unique" UNIQUE("region_name")
);
--> statement-breakpoint
CREATE TABLE "store_books" (
	"id" serial PRIMARY KEY NOT NULL,
	"store_id" integer NOT NULL,
	"book_id" integer NOT NULL,
	"amount" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stores" (
	"id" serial PRIMARY KEY NOT NULL,
	"store_name" text NOT NULL,
	"region_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "books" DROP CONSTRAINT "books_id_unique";--> statement-breakpoint
ALTER TABLE "booking_history" DROP CONSTRAINT "booking_history_booking_amount_books_amount_fk";
--> statement-breakpoint
ALTER TABLE "booking_history" ADD COLUMN "store_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "booking_history" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "booking_history" ADD COLUMN "price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "prices" ADD CONSTRAINT "prices_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prices" ADD CONSTRAINT "prices_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store_books" ADD CONSTRAINT "store_books_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store_books" ADD CONSTRAINT "store_books_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stores" ADD CONSTRAINT "stores_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking_history" ADD CONSTRAINT "booking_history_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books" DROP COLUMN "price";--> statement-breakpoint
ALTER TABLE "books" DROP COLUMN "status";--> statement-breakpoint
ALTER TABLE "books" DROP COLUMN "amount";