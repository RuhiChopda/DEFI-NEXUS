import {
  users,
  type User,
  type UpsertUser,
  lendingPositions,
  type LendingPosition,
  type InsertLending,
  borrowingPositions,
  type BorrowingPosition,
  type InsertBorrowing,
  transactions,
  type Transaction,
  type InsertTransaction,
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Lending operations
  createLendingPosition(userId: string, position: InsertLending): Promise<LendingPosition>;
  getLendingPositions(userId: string): Promise<LendingPosition[]>;
  deleteLendingPosition(id: number): Promise<void>;

  // Borrowing operations
  createBorrowingPosition(userId: string, position: InsertBorrowing): Promise<BorrowingPosition>;
  getBorrowingPositions(userId: string): Promise<BorrowingPosition[]>;
  deleteBorrowingPosition(id: number): Promise<void>;

  // Transaction operations
  createTransaction(userId: string, transaction: InsertTransaction): Promise<Transaction>;
  getTransactions(userId: string): Promise<Transaction[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async createLendingPosition(userId: string, position: InsertLending): Promise<LendingPosition> {
    const [result] = await db.insert(lendingPositions).values({ userId, ...position }).returning();
    return result;
  }

  async getLendingPositions(userId: string): Promise<LendingPosition[]> {
    return await db
      .select()
      .from(lendingPositions)
      .where(eq(lendingPositions.userId, userId));
  }

  async deleteLendingPosition(id: number): Promise<void> {
    await db.delete(lendingPositions).where(eq(lendingPositions.id, id));
  }

  async createBorrowingPosition(userId: string, position: InsertBorrowing): Promise<BorrowingPosition> {
    const [result] = await db.insert(borrowingPositions).values({ userId, ...position }).returning();
    return result;
  }

  async getBorrowingPositions(userId: string): Promise<BorrowingPosition[]> {
    return await db
      .select()
      .from(borrowingPositions)
      .where(eq(borrowingPositions.userId, userId));
  }

  async deleteBorrowingPosition(id: number): Promise<void> {
    await db.delete(borrowingPositions).where(eq(borrowingPositions.id, id));
  }

  async createTransaction(userId: string, transaction: InsertTransaction): Promise<Transaction> {
    const [result] = await db.insert(transactions).values({ userId, ...transaction }).returning();
    return result;
  }

  async getTransactions(userId: string): Promise<Transaction[]> {
    return await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(transactions.createdAt);
  }
}

export const storage = new DatabaseStorage();
