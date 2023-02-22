import { DocumentType } from '@typegoose/typegoose';
import { CreateOrDeleteFavoriteOfferDto } from '../../common/database/dto/create-or-delete-favorite-offer-dto.js';
import { OfferFavoriteEntity } from '../../common/database/entities/offer-favorite.entity';

export interface IOfferFavoriteService {
    find(userId: string): Promise<DocumentType<OfferFavoriteEntity>[]>;
    create(dto: CreateOrDeleteFavoriteOfferDto): Promise<DocumentType<OfferFavoriteEntity>>;
    delete(dto: CreateOrDeleteFavoriteOfferDto): Promise<DocumentType<OfferFavoriteEntity> | null>;
}


