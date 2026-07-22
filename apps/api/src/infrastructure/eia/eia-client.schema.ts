import { z } from 'zod';

export const EiaRowSchema = z.object({
  period: z.string().regex(/^\d{4}-\d{2}$/, 'Period must be in YYYY-MM format'),
  stateid: z.string().min(2).max(5),
  sectorid: z.literal('RES'),
  price: z.coerce.number().min(0).max(1000).nullable().optional(),
  revenue: z.coerce.number().min(0).nullable().optional(),
  sales: z.coerce.number().min(0).nullable().optional(),
  customers: z.coerce.number().min(0).nullable().optional(),
  'price-units': z.string().optional(),
});

export const EiaResponseSchema = z.object({
  response: z.object({
    total: z.coerce.number().int().min(0),
    dateFormat: z.string().optional(),
    frequency: z.string().optional(),
    data: z.array(EiaRowSchema),
  }),
});

export type EiaRow = z.infer<typeof EiaRowSchema>;
export type EiaResponse = z.infer<typeof EiaResponseSchema>;
