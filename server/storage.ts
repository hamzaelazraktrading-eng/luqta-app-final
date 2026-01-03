import { db } from "./db";
import { offers, coupons, type InsertOffer, type Offer, type InsertCoupon, type Coupon } from "@shared/schema";
import { eq, desc, ilike, or, gte } from "drizzle-orm";

export interface IStorage {
  getOffers(search?: string, category?: string): Promise<Offer[]>;
  getOffer(id: number): Promise<Offer | undefined>;
  createOffer(offer: InsertOffer): Promise<Offer>;
  updateOffer(id: number, offer: Partial<InsertOffer>): Promise<Offer>;
  deleteOffer(id: number): Promise<void>;
  
  getCoupons(): Promise<Coupon[]>;
  createCoupon(coupon: InsertCoupon): Promise<Coupon>;
  deleteCoupon(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getOffers(search?: string, category?: string): Promise<Offer[]> {
    let query = db.select().from(offers).orderBy(desc(offers.createdAt));
    if (category && category !== "all") {
      query = query.where(eq(offers.category, category));
    }
    if (search) {
      const searchLower = `%${search}%`;
      query = query.where(or(ilike(offers.title, searchLower), ilike(offers.description, searchLower)));
    }
    return await query;
  }

  async getOffer(id: number): Promise<Offer | undefined> {
    const [offer] = await db.select().from(offers).where(eq(offers.id, id));
    return offer;
  }

  async createOffer(insertOffer: InsertOffer): Promise<Offer> {
    const [offer] = await db.insert(offers).values(insertOffer).returning();
    return offer;
  }

  async updateOffer(id: number, updates: Partial<InsertOffer>): Promise<Offer> {
    const [updated] = await db.update(offers).set(updates).where(eq(offers.id, id)).returning();
    return updated;
  }

  async deleteOffer(id: number): Promise<void> {
    await db.delete(offers).where(eq(offers.id, id));
  }

  async getCoupons(): Promise<Coupon[]> {
    return await db.select().from(coupons).where(gte(coupons.expiryDate, new Date())).orderBy(desc(coupons.expiryDate));
  }

  async createCoupon(insertCoupon: InsertCoupon): Promise<Coupon> {
    const [coupon] = await db.insert(coupons).values(insertCoupon).returning();
    return coupon;
  }

  async deleteCoupon(id: number): Promise<void> {
    await db.delete(coupons).where(eq(coupons.id, id));
  }
}

export const storage = new DatabaseStorage();
