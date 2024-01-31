import { Types } from 'mongoose';

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
  createdBy: Types.ObjectId;
};
export type QueryParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  price?: number;
  releaseDate?: string;
  brand?: string;
  model?: string;
  operatingSystem?: string;
  storageCapacity?: number;
  screenSize?: number;
  minPrice?: number;
  maxPrice?: number;
};
