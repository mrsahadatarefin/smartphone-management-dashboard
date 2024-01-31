import { z } from 'zod';

export type TProduct = {
  name: string;
  price: number;
  quantity: number;
  brand: string;
  model: string;
  operatingSystem: string;
  storageCapacity: number;
  screenSize: number;
  releaseDate: string;
};

export const productValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    price: z.number({ required_error: 'Price is required' }),
    quantity: z.number({ required_error: 'Quantity is required' }),
    brand: z.string({ required_error: 'brand is required' }),
    model: z.string({ required_error: 'model is required' }),
    operatingSystem: z.string({
      required_error: 'operating system is required',
    }),
    storageCapacity: z.number({
      required_error: 'storage capacity is required',
    }),
    screenSize: z.number({ required_error: 'screen size is required' }),
    releaseDate: z.string({ required_error: 'release date is required' }),
  }),
});
export const productUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    price: z.number({ required_error: 'Price is required' }).optional(),
    quantity: z.number({ required_error: 'Quantity is required' }).optional(),
    brand: z.string({ required_error: 'brand is required' }).optional(),
    model: z.string({ required_error: 'model is required' }).optional(),
    operatingSystem: z
      .string({
        required_error: 'operating system is required',
      })
      .optional(),
    storageCapacity: z
      .number({
        required_error: 'storage capacity is required',
      })
      .optional(),
    screenSize: z
      .number({ required_error: 'screen size is required' })
      .optional(),
    releaseDate: z
      .string({ required_error: 'release date is required' })
      .optional(),
  }),
});
