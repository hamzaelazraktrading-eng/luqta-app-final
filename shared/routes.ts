import { z } from 'zod';
import { insertOfferSchema, offers } from './schema';

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
  offers: {
    list: {
      method: 'GET' as const,
      path: '/api/offers',
      input: z.object({
        category: z.string().optional(),
        search: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof offers.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/offers/:id',
      responses: {
        200: z.custom<typeof offers.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/offers',
      input: insertOfferSchema,
      responses: {
        201: z.custom<typeof offers.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/offers/:id',
      input: insertOfferSchema.partial(),
      responses: {
        200: z.custom<typeof offers.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/offers/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
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

export type OfferInput = z.infer<typeof api.offers.create.input>;
export type OfferResponse = z.infer<typeof api.offers.create.responses[201]>;
