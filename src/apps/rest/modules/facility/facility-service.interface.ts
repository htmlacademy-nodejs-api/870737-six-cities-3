import { DocumentType } from '@typegoose/typegoose';
import { CreateFacilityDto } from '../../common/database/dto/create-facility-dto.js';
import { FacilityEntity } from '../../common/database/entities/facility.entity.js';

export interface IFacilityService {
    create(dto: CreateFacilityDto): Promise<DocumentType<FacilityEntity>>;
    getById(id: string): Promise<DocumentType<FacilityEntity> | null>;
    findByName(name: string): Promise<DocumentType<FacilityEntity> | null>;
    findByNameOrCreate(name: string, dto: CreateFacilityDto): Promise<DocumentType<FacilityEntity>>;
}
