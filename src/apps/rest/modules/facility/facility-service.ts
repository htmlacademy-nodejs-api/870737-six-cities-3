import { DocumentType } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { inject, injectable } from 'inversify';
import { ILogger } from '../../../../core';
import { Component } from '../../common/const/component.js';
import { CreateFacilityDto } from '../../common/database/dto/create-facility-dto.js';
import { FacilityEntity } from '../../common/database/entities/facility.entity';
import { IFacilityService } from './facility-service.interface';

@injectable()
export class FacilityService implements IFacilityService {

  constructor(
        @inject(Component.ILogger) private logger: ILogger,
        @inject(Component.FacilityModel) private facilityModel: ModelType<FacilityEntity>
  ) {}

  public async create(dto: CreateFacilityDto): Promise<DocumentType<FacilityEntity>> {
    const result = await this.facilityModel.create(dto);
    this.logger.info(`Facility ${dto.name} record created`);
    return result;
  }

  public async getById(id: string): Promise<DocumentType<FacilityEntity> | null> {
    return this.facilityModel.findById(id).exec();
  }

  public async findByName(name: string): Promise<DocumentType<FacilityEntity> | null> {
    return this.facilityModel.findOne({ name });
  }

  public async findByNameOrCreate(name: string, dto: CreateFacilityDto): Promise<DocumentType<FacilityEntity>> {
    const existedRecord = await this.findByName(name);
    if (existedRecord) {
      return existedRecord;
    }
    return this.facilityModel.create(dto);
  }
}
