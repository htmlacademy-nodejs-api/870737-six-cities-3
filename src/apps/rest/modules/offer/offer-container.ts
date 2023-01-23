import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Component } from '../../common/const/component.js';
import { OfferEntity, OfferModel } from '../../common/database/entities/offer.entity';
import { OfferService } from './offer-service.js';
import { IOfferService } from './offer-service.interface';

const offerContainer = new Container();

offerContainer.bind<IOfferService>(Component.IOfferService).to(OfferService);
offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

export { offerContainer };
