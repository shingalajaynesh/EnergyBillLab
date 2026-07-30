import { z } from 'zod';

export const NaturalGasEiaRowSchema = z.object({
  period: z.string().regex(/^\d{4}-\d{2}$/, 'Period must be in YYYY-MM format'),
  duoarea: z.string().min(2),
  'area-name': z.string().optional(),
  process: z.string().optional().default('PIN'),
  'process-name': z.string().optional(),
  product: z.string().optional().default('EPG0'),
  'product-name': z.string().optional(),
  value: z.coerce.number().finite(),
  units: z.string().optional().default('$/MCF'),
  series: z.string().optional(),
  'series-description': z.string().optional(),
});

export const NaturalGasEiaResponseSchema = z.object({
  response: z.object({
    total: z.coerce.number().int().min(0),
    dateFormat: z.string().optional(),
    frequency: z.string().optional(),
    data: z.array(NaturalGasEiaRowSchema),
  }),
});

export type NaturalGasEiaRow = z.infer<typeof NaturalGasEiaRowSchema>;
export type NaturalGasEiaResponse = z.infer<typeof NaturalGasEiaResponseSchema>;
