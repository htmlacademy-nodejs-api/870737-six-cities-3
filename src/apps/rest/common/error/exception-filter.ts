import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import {inject, injectable} from 'inversify';
import { ILogger } from '../../../../core/interfaces/logger.interface.js';
import { createErrorObject } from '../../../../core/utils/common.js';
import { Component } from '../const/component.js';
import { IExceptionFilter } from './exception-filter.interface';
import HttpError from './http-error.js';

@injectable()
export default class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(Component.ILogger) private logger: ILogger) {
    this.logger.info('Register ExceptionFilter');
  }

  private handleHttpError(error: HttpError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[${error.detail}]: ${error.httpStatusCode} — ${error.message}`);

    res
      .status(error.httpStatusCode)
      .json(createErrorObject(error.message));
  }

  private handleOtherError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(error.message));


  }

  public catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    }

    this.handleOtherError(error, req, res, next);
  }

}
