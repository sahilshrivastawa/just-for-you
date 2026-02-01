import { db } from "./db";
import { loveLogs, type InsertLoveLog, type LoveLog } from "@shared/schema";
import { users, type User, type UpsertUser } from "@shared/models/auth";
import { eq } from "drizzle-orm";

export interface IStorage {
  createLoveLog(log: InsertLoveLog): Promise<LoveLog>;
  // Auth methods
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  async createLoveLog(log: InsertLoveLog): Promise<LoveLog> {
    const [newLog] = await db.insert(loveLogs).values(log).returning();
    return newLog;
  }

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
        set: { ...userData, updatedAt: new Date() },
      })
      .returning();
    return user;
  }
}

export const storage = new DatabaseStorage();
