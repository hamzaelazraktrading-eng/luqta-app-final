import { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOfferSchema, insertCouponSchema, insertNotificationSchema } from "@shared/schema";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.get("/api/offers", async (req, res) => {
    const { search, category } = req.query;
    const offers = await storage.getOffers(search as string, category as string);
    res.json(offers);
  });

  app.get("/api/offers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const offer = await storage.getOffer(id);
    if (!offer) return res.status(404).send("Offer not found");
    res.json(offer);
  });

  app.post("/api/offers", async (req, res) => {
    const parsed = insertOfferSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const offer = await storage.createOffer(parsed.data);
    res.status(201).json(offer);
  });

  app.patch("/api/offers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const offer = await storage.updateOffer(id, req.body);
    res.json(offer);
  });

  app.delete("/api/offers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteOffer(id);
    res.sendStatus(204);
  });

  app.get("/api/coupons", async (_req, res) => {
    const coupons = await storage.getCoupons();
    res.json(coupons);
  });

  app.post("/api/coupons", async (req, res) => {
    const parsed = insertCouponSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const coupon = await storage.createCoupon(parsed.data);
    res.status(201).json(coupon);
  });

  app.patch("/api/coupons/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const coupon = await storage.updateCoupon(id, req.body);
    res.json(coupon);
  });

  app.delete("/api/coupons/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteCoupon(id);
    res.sendStatus(204);
  });

  app.post("/api/notifications", async (req, res) => {
    const parsed = insertNotificationSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const notification = await storage.createNotification(parsed.data);
    res.status(201).json(notification);
  });

  return httpServer;
}
