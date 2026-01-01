import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.offers.list.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;
    const offers = await storage.getOffers(search, category);
    res.json(offers);
  });

  app.get(api.offers.get.path, async (req, res) => {
    const offer = await storage.getOffer(Number(req.params.id));
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.json(offer);
  });

  app.post(api.offers.create.path, async (req, res) => {
    try {
      const input = api.offers.create.input.parse(req.body);
      const offer = await storage.createOffer(input);
      res.status(201).json(offer);
    } catch (err) {
       if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.put(api.offers.update.path, async (req, res) => {
     try {
      const input = api.offers.update.input.parse(req.body);
      const updated = await storage.updateOffer(Number(req.params.id), input);
      if (!updated) return res.status(404).json({ message: "Offer not found" });
      res.json(updated);
    } catch (err) {
       if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.offers.delete.path, async (req, res) => {
    await storage.deleteOffer(Number(req.params.id));
    res.status(204).send();
  });

  // Seed data
  const existing = await storage.getOffers();
  if (existing.length === 0) {
    await storage.createOffer({
      title: "عرض العيد - خصم 50%",
      description: "احصل على أفضل المنتجات بنصف السعر. عرض لفترة محدودة.",
      oldPrice: "200 SAR",
      newPrice: "100 SAR",
      discount: "50%",
      imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=60",
      category: "Electronics",
    });
     await storage.createOffer({
      title: "طقم عطور فاخر",
      description: "عطور شرقية مميزة تناسب جميع الأذواق.",
      oldPrice: "500 SAR",
      newPrice: "350 SAR",
      discount: "30%",
      imageUrl: "https://images.unsplash.com/photo-1594035910387-fea477942698?w=800&auto=format&fit=crop&q=60",
      category: "Perfumes",
    });
  }

  return httpServer;
}
