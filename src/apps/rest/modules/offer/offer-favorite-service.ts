import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { ILogger } from '../../../../core/interfaces/logger.interface.js';
import { Component } from '../../common/const/component.js';
import { CreateOrDeleteFavoriteOfferDto } from '../../common/database/dto/create-or-delete-favorite-offer-dto.js';
import { OfferFavoriteEntity } from '../../common/database/entities/offer-favorite.entity';
import { IOfferFavoriteService } from './offer-favorite-service.interface';

@injectable()
export class OfferFavoriteService implements IOfferFavoriteService {
  constructor(
        @inject(Component.ILogger) private logger: ILogger,
        @inject(Component.OfferFavoriteModel) private offerFavoriteModel: types.ModelType<OfferFavoriteEntity>) {
  }

  public async find(userId: string): Promise<DocumentType<OfferFavoriteEntity>[]> {
    this.logger.info(`Get favorite offers for user ${userId}`);
    return this.offerFavoriteModel.find( { userId }).exec();
  }

  public async create(dto: CreateOrDeleteFavoriteOfferDto): Promise<DocumentType<OfferFavoriteEntity>> {
    return this.offerFavoriteModel.create(dto);
  }

  public async delete(dto: CreateOrDeleteFavoriteOfferDto): Promise<DocumentType<OfferFavoriteEntity> | null> {
    return this.offerFavoriteModel.findOneAndDelete(dto);
  }
}


