import { model } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { QueryParams, TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDb = async (userId: JwtPayload, payload: TProduct) => {
  const data = {
    ...payload,
    createdBy: userId,
  };
  const result = await ProductModel.create(data);
  return result;
};

const allProductFindFromDb = async (queryParams: QueryParams) => {
  const {
    page = 1,
    limit = 10,
    sortBy,
    sortOrder = 'asc',
    maxPrice,
    minPrice,
    model,
    operatingSystem,
    releaseDate,
    screenSize,
    storageCapacity,
    brand,
  } = queryParams;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const matchCriteria: Record<string, any> = {};
  if (minPrice !== undefined || maxPrice !== undefined) {
    matchCriteria.price = {};
    if (maxPrice !== undefined) {
      matchCriteria.price.$lte = maxPrice;
    }
    if (minPrice !== undefined) {
      matchCriteria.price.$gte = minPrice;
    }
  }
  if (operatingSystem !== undefined) {
    matchCriteria.operatingSystem = operatingSystem;
  }
  if (model !== undefined) {
    matchCriteria.model = model;
  }
  if (screenSize !== undefined) {
    matchCriteria.screenSize = screenSize;
  }
  if (brand !== undefined) {
    matchCriteria.brand = brand;
  }
  if (storageCapacity !== undefined) {
    matchCriteria.storageCapacity = storageCapacity;
  }
  if (releaseDate !== undefined) {
    if (releaseDate !== undefined) {
      matchCriteria.releaseDate.$gte = releaseDate;
    }
    if (releaseDate !== undefined) {
      matchCriteria.releaseDate.$lte = releaseDate;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortCriteria: Record<string, any> = {};
  if (sortBy) {
    sortCriteria[sortBy] = sortOrder === 'desc' ? -1 : 1;
  }

  const totalCount = await ProductModel.countDocuments(matchCriteria).exec();

  const query = ProductModel.find(matchCriteria).populate('createdBy');

  if (Object.keys(sortCriteria).length > 0) {
    query.sort(sortCriteria);
  }

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

const updateProductIntoDb = async (id: string, payload: Partial<TProduct>) => {
  const result = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProductIntoDb = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

export const productService = {
  allProductFindFromDb,
  createProductIntoDb,
  updateProductIntoDb,
  deleteProductIntoDb,
};
