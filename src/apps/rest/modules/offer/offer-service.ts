import { types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { ILogger } from '../../../../core';
import { Component } from '../../common/const/component.js';
import { CreateOfferDto } from '../../common/database/dto/create-offer-dto.js';
import { OfferEntity } from '../../common/database/entities/offer.entity';
import { IOfferService } from './offer-service.interface';

@injectable()
export class OfferService implements IOfferService {
  constructor(
        @inject(Component.ILogger) private logger: ILogger,
        @inject(Component.OfferModel) private offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDto): Promise<types.DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`Offer ${dto.name} record created`);
    return result;
  }

  public async findById(offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    return await this.offerModel.findById(offerId).exec();
  }
}
