import { Types } from 'mongoose';
export type TSell = {
  id?: string;
  quantity: number;
  name: string;
  buyer: Types.ObjectId;
  date: string;
};
export type sellQueryParams = {
  page?: number;
  limit?: number;
  Date?: string;
};
