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
export const productController = { createProduct };
