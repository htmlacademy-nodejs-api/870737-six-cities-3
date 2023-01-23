import { DocumentType } from '@typegoose/typegoose';
import { CreateCityDto } from '../../common/database/dto/create-city-dto.js';
import { CityEntity } from '../../common/database/entities/city.entity';

export interface ICityService {
    create(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
    findByName(name: string): Promise<DocumentType<CityEntity> | null>;
    findByNameOrCreate(name: string, dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
}
