import { Container } from 'inversify';
import { Component } from '../../common/const/component.js';
import { FacilityService } from './facility-service.js';
import { IFacilityService } from './facility-service.interface';
import { types } from '@typegoose/typegoose';
import { FacilityEntity, FacilityModel } from '../../common/database/entities/facility.entity.js';

const facilityContainer = new Container();

facilityContainer.bind<IFacilityService>(Component.IFacilityService).to(FacilityService);
facilityContainer.bind<types.ModelType<FacilityEntity>>(Component.FacilityModel).toConstantValue(FacilityModel);

export { facilityContainer };
