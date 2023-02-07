import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from '../../common/database/dto/create-offer-dto.js';
import { UpdateOfferDto } from '../../common/database/dto/update-offer-dto.js';
import { OfferEntity } from '../../common/database/entities/offer.entity';

export interface IOfferService {
    find(offset: number, limit: number): Promise<DocumentType<OfferEntity>[]>;
    findPremium(cityName: string): Promise<DocumentType<OfferEntity>[]>;
    findFavorite(userId: string, offset: number, limit: number): Promise<DocumentType<OfferEntity>[]>
    create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
    updateById(dto: UpdateOfferDto, offerId: string): Promise<DocumentType<OfferEntity> | null>
    deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
    findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
