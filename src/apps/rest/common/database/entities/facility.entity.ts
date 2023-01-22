import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions
} from '@typegoose/typegoose';

import { IFacility } from '../../../../../core';

export interface FacilityEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'facilities'
  }
})

export class FacilityEntity extends defaultClasses.TimeStamps implements IFacility {
  @prop({ required: true, trim: true })
  public name!: string;
}

export const FacilityModel = getModelForClass(FacilityEntity);
