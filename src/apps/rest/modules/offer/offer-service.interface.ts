import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from '../../common/database/dto/create-offer-dto.js';
import { OfferEntity } from '../../common/database/entities/offer.entity';

export interface IOfferService {
    create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
    findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
