import { Types } from 'mongoose';
export type TSell = {
  id?: string;
  quantity: number;
  name: string;
  buyer: Types.ObjectId;
  Date: string;
};
