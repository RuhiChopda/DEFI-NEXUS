import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  decimal,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (mandatory for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);

// Users table (mandatory for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Lending positions
export const lendingPositions = pgTable("lending_positions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  asset: varchar("asset").notNull(), // ETH, USDC, etc.
  amount: decimal("amount", { precision: 20, scale: 8 }).notNull(),
  apy: decimal("apy", { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Borrowing positions
export const borrowingPositions = pgTable("borrowing_positions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  asset: varchar("asset").notNull(),
  amount: decimal("amount", { precision: 20, scale: 8 }).notNull(),
  apy: decimal("apy", { precision: 5, scale: 2 }).notNull(),
  healthFactor: decimal("health_factor", { precision: 5, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Transactions history
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type").notNull(), // supply, borrow, repay, withdraw
  asset: varchar("asset").notNull(),
  amount: decimal("amount", { precision: 20, scale: 8 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Types for Auth
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Types for Lending
export type LendingPosition = typeof lendingPositions.$inferSelect;
export const insertLendingSchema = createInsertSchema(lendingPositions).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertLending = z.infer<typeof insertLendingSchema>;

// Types for Borrowing
export type BorrowingPosition = typeof borrowingPositions.$inferSelect;
export const insertBorrowingSchema = createInsertSchema(borrowingPositions).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertBorrowing = z.infer<typeof insertBorrowingSchema>;

// Types for Transactions
export type Transaction = typeof transactions.$inferSelect;
export const insertTransactionSchema = createInsertSchema(transactions).omit({ id: true, createdAt: true });
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
