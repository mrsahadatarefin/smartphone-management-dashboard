import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  productUpdateValidationSchema,
  productValidationSchema,
} from './product.validation';
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
route.get('/', auth(User_Role.user), productController.allProduct);
route.put(
  '/:id',
  auth(User_Role.user),
  validateRequest(productUpdateValidationSchema),
  productController.updateProduct,
);
route.delete(
  '/:id',
  auth(User_Role.user),
  validateRequest(productUpdateValidationSchema),
  productController.deleteProduct,
);

export const productRouter = route;
