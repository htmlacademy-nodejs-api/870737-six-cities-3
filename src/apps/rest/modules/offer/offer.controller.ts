import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { HttpMethod } from '../../../../core/enums/http-method.enum.js';
import { ILogger } from '../../../../core/interfaces/logger.interface.js';
import { fillDto } from '../../../../core/utils/common.js';
import { Component } from '../../common/const/component.js';
import { Controller } from '../../common/controllers/controller.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { IOfferService } from './offer-service.interface.js';
import OfferDetailResponse from './response/offer-detail.response.js';
// import OfferDetailResponse from './response/offer-detail.response.js';
import OfferResponse from './response/offer.response.js';

@injectable()
export class OfferController extends Controller {
  constructor(@inject(Component.ILogger) logger: ILogger, @inject(Component.IOfferService) private offerService: IOfferService) {
    super(logger);

    this.logger.info('Register for offer controller');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.indexFavorites });
    this.addRoute({ path: '/premium/:cityName', method: HttpMethod.Get, handler: this.indexPremium });
    this.addRoute({ path: '/:id', method: HttpMethod.Get, handler: this.get, middlewares: [
      new ValidateObjectIdMiddleware('id'),
      new DocumentExistsMiddleware(this.offerService, 'Offer', 'id')
    ] });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/status', method: HttpMethod.Post, handler: this.changeStatus });
    this.addRoute({ path: '/', method: HttpMethod.Delete, handler: this.delete });

  }

  public async index(req: Request, res: Response): Promise<void> {
    const { offset, limit } = req.query;
    const offsetParam = isNaN(parseInt(offset as string, 10)) ? undefined : parseInt(offset as string, 10);
    const limitParam = isNaN(parseInt(limit as string, 10)) ? undefined : parseInt(offset as string, 10);
    const offers = await this.offerService.find(offsetParam, limitParam);
    this.ok(res, fillDto(OfferResponse, offers));
  }

  public indexFavorites(req: Request, res: Response): void {
    console.log(req, res);

    // Код обработчика
  }

  public indexPremium(req: Request, res: Response): void {
    console.log(req, res);

    // Код обработчика
  }

  public async get(req: Request, res: Response): Promise<void> {
    const {params}: Request = req;
    const id: string = params.id;
    const offer = await this.offerService.findById(id);
    this.ok(res, fillDto(OfferDetailResponse, offer));

    // Код обработчика
  }

  public create(req: Request, res: Response): void {
    console.log(req, res);

    // Код обработчика
  }

  public update(req: Request, res: Response): void {
    console.log(req, res);

    // Код обработчика
  }

  public changeStatus(req: Request, res: Response): void {
    console.log(req, res);

    // Код обработчика
  }

  public delete(req: Request, res: Response): void {
    console.log(req, res);

    // Код обработчика
  }
}
