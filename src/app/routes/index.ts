import { Router } from 'express';
import { userRoute } from '../modules/user/user.route';
import { productRouter } from '../modules/products/product.route';
import { sellRoute } from '../modules/sells/sell.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRoute,
  },
  {
    path: '/product',
    route: productRouter,
  },
  {
    path: '/sell',
    route: sellRoute,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
