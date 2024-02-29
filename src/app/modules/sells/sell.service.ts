import { JwtPayload } from 'jsonwebtoken';
import { SellModel } from './sell.model';
import { TSell } from './sell.interface';
import mongoose from 'mongoose';
import { ProductModel } from '../products/product.model';

const createProductIntoDb = async (userId: JwtPayload, payload: TSell) => {
  const data = {
    ...payload,
    createdBy: userId,
  };
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const product = await ProductModel.findById(payload.id);
    console.log(product);
    if (
      !product ||
      payload.quantity > product.quantity ||
      product.quantity === 0
    ) {
      throw new Error('Product not available');
    }

    const result = await SellModel.create([data], { session });
    await ProductModel.findOneAndUpdate(
      { _id: product.id },
      {
        $set: { quantity: product.quantity - payload.quantity },
      },
      { session },
    );

    await session.commitTransaction();
    return result;
  } catch (e) {
    await session.abortTransaction();
    throw new Error('Sell not created');
  } finally {
    session.endSession();
  }
};
export const SellService = {
  createProductIntoDb,
};
