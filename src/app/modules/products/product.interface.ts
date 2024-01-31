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
