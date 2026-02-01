import { db } from "./db";
import { loveLogs, type InsertLoveLog, type LoveLog } from "@shared/schema";

export interface IStorage {
  createLoveLog(log: InsertLoveLog): Promise<LoveLog>;
}

export class DatabaseStorage implements IStorage {
  async createLoveLog(insertLog: InsertLoveLog): Promise<LoveLog> {
    const [log] = await db.insert(loveLogs).values(insertLog).returning();
    return log;
  }
}

export const storage = new DatabaseStorage();
