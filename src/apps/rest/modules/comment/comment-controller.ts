import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { HttpMethod } from '../../../../core/enums/http-method.enum.js';
import { ILogger } from '../../../../core/interfaces/logger.interface.js';
import { Component } from '../../common/const/component.js';
import { Controller } from '../../common/controllers/controller.js';

@injectable()
export class CommentController extends Controller {
  constructor(@inject(Component.ILogger) logger: ILogger) {
    super(logger);

    this.logger.info('Register for comment controller');

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.index });
  }

  public index(req: Request, res: Response): void {
    console.log(req, res);
    // Код обработчика
  }

  public create(req: Request, res: Response): void {
    console.log(req, res);
    // Код обработчика
  }
}
