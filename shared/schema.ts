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
  storeName: text("store_name"),
  affiliateUrl: text("affiliate_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const coupons = pgTable("coupons", {
  id: serial("id").primaryKey(),
  store: text("store").notNull(),
  code: text("code").notNull(),
  discount: text("discount").notNull(),
  description: text("description").notNull(),
  expiryDate: timestamp("expiry_date").notNull(),
});

export const insertOfferSchema = createInsertSchema(offers).omit({
  id: true,
  createdAt: true,
});

export const insertCouponSchema = createInsertSchema(coupons).omit({
  id: true,
});

export type Offer = typeof offers.$inferSelect;
export type InsertOffer = z.infer<typeof insertOfferSchema>;
export type Coupon = typeof coupons.$inferSelect;
export type InsertCoupon = z.infer<typeof insertCouponSchema>;
