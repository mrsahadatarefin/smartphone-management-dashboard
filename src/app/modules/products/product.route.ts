import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { productValidationSchema } from './product.validation';
import { productController } from './product.controller';
import auth from '../../middlewares/auth';
import { User_Role } from '../user/user.constent';
const route = express.Router();

route.post(
  '/create-product',
  auth(User_Role.user),
  validateRequest(productValidationSchema),
  productController.createProduct,
);

export const productRouter = route;
