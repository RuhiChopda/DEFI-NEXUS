import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import {
  insertLendingSchema,
  insertBorrowingSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Get current user
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Get dashboard data
  app.get("/api/dashboard", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const lending = await storage.getLendingPositions(userId);
      const borrowing = await storage.getBorrowingPositions(userId);
      const txns = await storage.getTransactions(userId);

      res.json({
        lending,
        borrowing,
        transactions: txns,
      });
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      res.status(500).json({ message: "Failed to fetch dashboard" });
    }
  });

  // Create lending position
  app.post("/api/lending", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validated = insertLendingSchema.parse(req.body);

      const position = await storage.createLendingPosition(userId, validated);

      // Log transaction
      await storage.createTransaction(userId, {
        type: "supply",
        asset: validated.asset,
        amount: validated.amount,
      });

      res.status(201).json(position);
    } catch (error: any) {
      console.error("Error creating lending position:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request", errors: error.errors });
      }
      res.status(400).json({ message: error.message || "Failed to create lending position" });
    }
  });

  // Get lending positions
  app.get("/api/lending", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const positions = await storage.getLendingPositions(userId);
      res.json(positions);
    } catch (error) {
      console.error("Error fetching lending positions:", error);
      res.status(500).json({ message: "Failed to fetch lending positions" });
    }
  });

  // Delete lending position (withdraw)
  app.delete("/api/lending/:id", isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteLendingPosition(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting lending position:", error);
      res.status(500).json({ message: "Failed to delete lending position" });
    }
  });

  // Create borrowing position
  app.post("/api/borrowing", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validated = insertBorrowingSchema.parse(req.body);

      const position = await storage.createBorrowingPosition(userId, validated);

      // Log transaction
      await storage.createTransaction(userId, {
        type: "borrow",
        asset: validated.asset,
        amount: validated.amount,
      });

      res.status(201).json(position);
    } catch (error: any) {
      console.error("Error creating borrowing position:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request", errors: error.errors });
      }
      res.status(400).json({ message: error.message || "Failed to create borrowing position" });
    }
  });

  // Get borrowing positions
  app.get("/api/borrowing", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const positions = await storage.getBorrowingPositions(userId);
      res.json(positions);
    } catch (error) {
      console.error("Error fetching borrowing positions:", error);
      res.status(500).json({ message: "Failed to fetch borrowing positions" });
    }
  });

  // Delete borrowing position (repay)
  app.delete("/api/borrowing/:id", isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBorrowingPosition(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting borrowing position:", error);
      res.status(500).json({ message: "Failed to delete borrowing position" });
    }
  });

  // Get transaction history
  app.get("/api/transactions", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const txns = await storage.getTransactions(userId);
      res.json(txns);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
