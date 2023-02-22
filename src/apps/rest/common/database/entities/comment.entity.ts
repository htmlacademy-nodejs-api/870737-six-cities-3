import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { UserEntity } from './user.entity.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public text!: string;

  @prop()
  public rate!: number;

  @prop({
    ref: OfferEntity,
    required: true,
  })
  public offerId!: string;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: string;
}

export const CommentModel = getModelForClass(CommentEntity);
