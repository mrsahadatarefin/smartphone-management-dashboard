import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { productService } from './product.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const body = req.body;
  const result = await productService.createProductIntoDb(userId, body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Product added  successfully',
    data: result,
  });
});

const allProduct = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await productService.allProductFindFromDb(query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'product retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const body = req.body;
  const result = await productService.updateProductIntoDb(id, body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await productService.deleteProductIntoDb(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});
export const productController = {
  allProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
