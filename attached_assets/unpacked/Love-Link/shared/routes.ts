import { z } from 'zod';
import { insertLoveLogSchema, loveLogs } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  loveLogs: {
    create: {
      method: 'POST' as const,
      path: '/api/love-logs',
      input: insertLoveLogSchema,
      responses: {
        201: z.custom<typeof loveLogs.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export type InsertLoveLog = z.infer<typeof insertLoveLogSchema>;
export type LoveLog = typeof loveLogs.$inferSelect;
export type NoteInput = z.infer<typeof api.loveLogs.create.input>;
export type NoteResponse = z.infer<typeof api.loveLogs.create.responses[201]>;
