import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { User_Role } from '../user/user.constent';
import { sellController } from './sell.controller';
import { sellValidationSchema } from './sell.validation';
const route = express.Router();
route.post(
  '/create-sell',
  auth(User_Role.user),
  validateRequest(sellValidationSchema),
  sellController.createSell,
);
route.get('/', auth(User_Role.user), sellController.getAllSell);
export const sellRoute = route;
