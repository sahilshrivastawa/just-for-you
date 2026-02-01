import { z } from 'zod';
import { insertLoveLogSchema, loveLogs } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
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

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type InsertLoveLog = z.infer<typeof insertLoveLogSchema>;
export type LoveLogResponse = z.infer<typeof api.loveLogs.create.responses[201]>;
