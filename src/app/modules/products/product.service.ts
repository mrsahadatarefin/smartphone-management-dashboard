import { JwtPayload } from 'jsonwebtoken';
import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDb = async (userId: JwtPayload, payload: TProduct) => {
  const data = {
    ...payload,
    createdBy: userId,
  };
  const result = await ProductModel.create(data);
  return result;
};

export const productService = { createProductIntoDb };
