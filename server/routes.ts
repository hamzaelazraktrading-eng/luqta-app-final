import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertOfferSchema, insertCouponSchema } from "@shared/schema";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.get("/api/offers", async (req, res) => {
    const offers = await storage.getOffers(req.query.search as string, req.query.category as string);
    res.json(offers);
  });

  app.get("/api/offers/:id", async (req, res) => {
    const offer = await storage.getOffer(Number(req.params.id));
    if (!offer) return res.status(404).json({ message: "Offer not found" });
    res.json(offer);
  });

  app.post("/api/offers", async (req, res) => {
    const input = insertOfferSchema.parse(req.body);
    const offer = await storage.createOffer(input);
    res.status(201).json(offer);
  });

  app.delete("/api/offers/:id", async (req, res) => {
    await storage.deleteOffer(Number(req.params.id));
    res.status(204).end();
  });

  app.get("/api/coupons", async (req, res) => {
    const coupons = await storage.getCoupons();
    res.json(coupons);
  });

  app.post("/api/coupons", async (req, res) => {
    const input = insertCouponSchema.parse(req.body);
    const coupon = await storage.createCoupon(input);
    res.status(201).json(coupon);
  });

  app.delete("/api/coupons/:id", async (req, res) => {
    await storage.deleteCoupon(Number(req.params.id));
    res.status(204).end();
  });

  return httpServer;
}
