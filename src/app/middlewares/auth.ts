import { NextFunction, Request, Response } from 'express';

import jwt, { JwtPayload } from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';
import config from '../config';
import { UserModel } from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new Error('You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, userId } = decoded;

    // checking if the user is exist
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error('This user is not found !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error('Unauthorized Access');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
