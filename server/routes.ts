import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertOfferSchema } from "@shared/schema";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.get("/api/offers", async (req, res) => {
    const offers = await storage.getOffers(req.query.search as string, req.query.category as string);
    res.json(offers);
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

  return httpServer;
}
