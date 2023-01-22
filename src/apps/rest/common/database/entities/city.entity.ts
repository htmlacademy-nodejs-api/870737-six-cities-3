import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { ICity } from '../../../../../core';


export interface CityEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'cities'
  }
})

export class CityEntity extends defaultClasses.TimeStamps implements ICity {
  @prop({ required: true, unique: true})
  public name!: string;

  @prop({ required: true })
  public latitude!: number;

  @prop({ required: true })
  public longitude!: number;

}

export const CityModel = getModelForClass(CityEntity);
