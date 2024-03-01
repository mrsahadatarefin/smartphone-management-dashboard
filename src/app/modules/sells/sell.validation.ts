import { z } from 'zod';

export const sellValidationSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: z.string({ required_error: 'Name is required' }),
    quantity: z.number({ required_error: 'quantity is required' }),
    date: z.string({ required_error: 'Date is required' }),
  }),
});
