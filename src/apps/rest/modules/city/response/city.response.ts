import { Expose } from 'class-transformer';

export class CityResponse {
  @Expose()
  public name!: string;

  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;
}
