import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const loveLogs = pgTable("love_logs", {
  id: serial("id").primaryKey(),
  name1: text("name1").notNull(),
  name2: text("name2").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLoveLogSchema = createInsertSchema(loveLogs).pick({
  name1: true,
  name2: true,
});

export type InsertLoveLog = z.infer<typeof insertLoveLogSchema>;
export type LoveLog = typeof loveLogs.$inferSelect;
