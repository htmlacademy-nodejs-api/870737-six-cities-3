import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Component } from '../../common/const/component.js';
import { CityEntity, CityModel } from '../../common/database/entities/city.entity';
import { ICityService } from './city-service.interface';
import { CityService } from './city-service.js';

const cityContainer = new Container();

cityContainer.bind<types.ModelType<CityEntity>>(Component.CityModel).toConstantValue(CityModel);
cityContainer.bind<ICityService>(Component.ICityService).to(CityService).inSingletonScope();

export { cityContainer };
