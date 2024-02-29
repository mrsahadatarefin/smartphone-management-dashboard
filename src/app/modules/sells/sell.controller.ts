import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SellService } from './sell.service';

const createSell = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const body = req.body;
  const result = await SellService.createProductIntoDb(userId, body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'sell added  successfully',
    data: result,
  });
});
export const sellController = {
  createSell,
};
