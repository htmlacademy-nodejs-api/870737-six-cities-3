import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { UserEntity } from './user.entity.js';

export interface OfferFavoriteEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'favorite-offers',
  }
})

export class OfferFavoriteEntity extends defaultClasses.TimeStamps {
  @prop({ ref: OfferEntity, required: true})
  public offerId!: Ref<OfferEntity>;

  @prop({ ref: UserEntity, required: true})
  public userId!: Ref<UserEntity>;
}

export const OfferFavoriteModel = getModelForClass(OfferFavoriteEntity);
