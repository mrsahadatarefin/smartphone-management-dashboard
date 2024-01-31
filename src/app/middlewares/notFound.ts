import { NextFunction, Request, Response } from 'express';

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    success: false,
    message: 'API Not Found !!',
    error: '',
  });
};

export default notFound;
