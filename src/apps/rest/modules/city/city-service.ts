import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { ILogger } from '../../../../core';
import { Component } from '../../common/const/component.js';
import { CreateCityDto } from '../../common/database/dto/create-city-dto.js';
import { CityEntity } from '../../common/database/entities/city.entity';
import { ICityService } from './city-service.interface';

@injectable()
export class CityService implements ICityService {
  constructor(
        @inject(Component.ILogger) private logger: ILogger,
        @inject(Component.CityModel) private cityModel: types.ModelType<CityEntity>
  ) {}

  public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const result = await this.cityModel.create(dto);
    this.logger.info(`City ${dto.name} record created`);
    return result;
  }

  public async findByName(name: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({ name }).exec();
  }

  public async findByNameOrCreate(name: string, dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const existedRecord = await this.findByName(name);

    if (!existedRecord) {
      return this.create(dto);
    }

    return existedRecord;
  }
}
