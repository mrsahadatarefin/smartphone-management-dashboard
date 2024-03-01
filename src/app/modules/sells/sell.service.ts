import { JwtPayload } from 'jsonwebtoken';
import { SellModel } from './sell.model';
import { TSell, sellQueryParams } from './sell.interface';
import mongoose from 'mongoose';
import { ProductModel } from '../products/product.model';
import moment from 'moment';
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

// const allSellFindFromDb = async (queryParams: QueryParams) => {
//   const {
//     page = 1,
//     limit = 10,

//     releaseDate,
//   } = queryParams;

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const matchCriteria: Record<string, any> = {};

//   if (releaseDate !== undefined) {
//     if (releaseDate !== undefined) {
//       matchCriteria.releaseDate.$gte = releaseDate;
//     }
//     if (releaseDate !== undefined) {
//       matchCriteria.releaseDate.$lte = releaseDate;
//     }
//   }
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any

//   const totalCount = await SellModel.countDocuments(matchCriteria).exec();

//   const query = SellModel.find(matchCriteria).populate('buyer');

//   const result = await query
//     .skip((page - 1) * limit)
//     .limit(limit)
//     .exec();

//   const response = {
//     meta: {
//       page,
//       limit,
//       total: totalCount,
//     },
//     data: result,
//   };

//   return response;
// };

const allSellFindFromDb = async (
  queryParams: sellQueryParams,
  interval: string,
) => {
  console.log(queryParams);
  const { page = 1, limit = 10, Date } = queryParams;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const matchCriteria: Record<string, any> = {};

  if (Date !== undefined) {
    if (interval === 'weekly') {
      matchCriteria.Date = {
        $gte: moment().startOf('week'),
        $lte: moment().endOf('week'),
      };
    } else if (interval === 'daily') {
      matchCriteria.Date = {
        $gte: moment().startOf('day'),
        $lte: moment().endOf('day'),
      };
    } else if (interval === 'monthly') {
      matchCriteria.Date = {
        $gte: moment().startOf('month'),
        $lte: moment().endOf('month'),
      };
    } else if (interval === 'yearly') {
      matchCriteria.Date = {
        $gte: moment().startOf('year'),
        $lte: moment().endOf('year'),
      };
    }
  }

  const totalCount = await SellModel.countDocuments(matchCriteria).exec();

  const query = SellModel.find(matchCriteria).populate('buyer');

  const result = await query
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  const response = {
    meta: {
      page,
      limit,
      total: totalCount,
    },
    data: result,
  };

  return response;
};
export const SellService = {
  createProductIntoDb,
  allSellFindFromDb,
};
