import { Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable } from 'inversify';
import asyncHandler from 'express-async-handler';
import { IController } from '../../../../core/interfaces/controller.interface.js';
import { ILogger } from '../../../../core/interfaces/logger.interface.js';
import { IMiddleware } from '../../../../core/interfaces/middleware.interface.js';
import { IRoute } from '../../../../core/interfaces/route.interface.js';

@injectable()
export abstract class Controller implements IController {
  private readonly _router: Router;
  constructor(protected readonly logger: ILogger) {
    this._router = Router();
  }

  public get router() {
    return this._router;
  }

  public addRoute(route: IRoute) {
    const routeHandler = asyncHandler(route.handler.bind(this));
    const middlewares = route.middlewares?.map(
      (middleware: IMiddleware) => asyncHandler(middleware.execute.bind(middleware))
    );

    const allHandlers = middlewares ? [...middlewares, routeHandler] : routeHandler;
    this._router[route.method](route.path, allHandlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type('application/json')
      .status(statusCode)
      .json(data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
