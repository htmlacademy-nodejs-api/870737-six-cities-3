import { Expose, Type } from 'class-transformer';
import { CityResponse } from '../../city/response/city.response.js';
import { FacilityResponse } from '../../facility/response/facility.response.js';
import { UserResponse } from '../../user/response/user-response.js';

export default class OfferDetailResponse {
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
  @Type(() => FacilityResponse)
  public facilities!: FacilityResponse[];

  @Expose()
  public description!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public roomsCount!: number;

  @Expose()
  public guestCount!: number;

  @Expose()
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;

  @Expose()
  public rate!: number;

  @Expose()
  public commentsCount!: number;

}
