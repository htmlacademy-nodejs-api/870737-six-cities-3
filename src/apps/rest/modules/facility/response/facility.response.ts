import { Expose } from 'class-transformer';

export class FacilityResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;
}
