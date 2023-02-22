import { HttpMethod } from '../enums/http-method.enum';
import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from './middleware.interface';

export interface IRoute {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: IMiddleware[]
}
