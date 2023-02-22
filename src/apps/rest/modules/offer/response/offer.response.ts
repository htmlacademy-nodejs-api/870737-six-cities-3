import { Expose, Type } from 'class-transformer';
import { CityResponse } from '../../city/response/city.response.js';

export default class OfferResponse {
  @Expose({ name: '_id'})
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public type!: string;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public createdAt!: string;

  @Expose()
  @Type(() => CityResponse)
  public city!: CityResponse;

  @Expose()
  public previewImage!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rate!: number;

  @Expose()
  public commentsCount!: number;

}
