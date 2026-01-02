import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const offers = pgTable("offers", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  oldPrice: text("old_price"),
  newPrice: text("new_price").notNull(),
  discount: text("discount"),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  storeName: text("store_name"), // تأكد من وجود هذا
  affiliateUrl: text("affiliate_url"), // تأكد من وجود هذا
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertOfferSchema = createInsertSchema(offers).omit({
  id: true,
  createdAt: true,
});

export type Offer = typeof offers.$inferSelect;
export type InsertOffer = z.infer<typeof insertOfferSchema>;
