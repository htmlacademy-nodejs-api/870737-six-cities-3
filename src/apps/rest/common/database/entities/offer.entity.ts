import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApartamentTypes } from '../../../../../core/enums/apartament-types.enum.js';
import { CityEntity } from './city.entity.js';
import { FacilityEntity } from './facility.entity.js';
import { UserEntity } from './user.entity.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ ref: CityEntity, required: true })
  public city!: Ref<CityEntity>;

  @prop({ required: true })
  public previewImage!: string;

  @prop({ required: true })
  public photos!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true , default: false})
  public isFavorite!: boolean;

  @prop({ type: () => String, enum: ApartamentTypes })
  public type!: ApartamentTypes;

  @prop({ required: true })
  public roomsCount!: number;

  @prop({ required: true })
  public guestCount!: number;

  @prop({ ref: UserEntity, required: true })
  public authorId!: Ref<UserEntity>;

  @prop({ required: true})
  public price!: number;

  @prop({
    ref: FacilityEntity,
    required: true,
    default: [],
    _id: false
  })
  public facilities!: Ref<FacilityEntity>[];

  @prop({ required: true, default: 0 })
  public commentsCount!: number;

  @prop({ required: true })
  public latitude!: number;

  @prop({ required: true })
  public longitude!: number;
}

export const OfferModel = getModelForClass(OfferEntity);
