import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Component } from '../../common/const/component.js';
import { OfferEntity, OfferModel } from '../../common/database/entities/offer.entity.js';
import { OfferService } from './offer-service.js';
import { IOfferService } from './offer-service.interface';
import { IController } from '../../../../core/interfaces/controller.interface.js';
import { OfferController } from './offer.controller.js';
import { OfferFavoriteEntity, OfferFavoriteModel } from '../../common/database/entities/offer-favorite.entity.js';
import { IOfferFavoriteService } from './offer-favorite-service.interface.js';
import { OfferFavoriteService } from './offer-favorite-service.js';

const offerContainer = new Container();

offerContainer.bind<IOfferService>(Component.IOfferService).to(OfferService);
offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
offerContainer.bind<IController>(Component.OfferController).to(OfferController).inSingletonScope();
offerContainer.bind<types.ModelType<OfferFavoriteEntity>>(Component.OfferFavoriteModel).toConstantValue(OfferFavoriteModel);
offerContainer.bind<IOfferFavoriteService>(Component.IOfferFavoriteService).to(OfferFavoriteService).inSingletonScope();
export { offerContainer };
