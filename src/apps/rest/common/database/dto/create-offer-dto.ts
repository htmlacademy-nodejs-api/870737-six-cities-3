import { ApartamentTypes } from '../../../../../core';

export class CreateOfferDto {
  name!: string;
  description!: string;
  city!: string;
  previewImage!: string;
  photos!: string[];
  isPremium!: boolean;
  isFavorite!: boolean;
  type!: ApartamentTypes;
  roomsCount!: number;
  guestCount!: number;
  authorId!: string;
  price!: number;
  facilities!: string[];
  latitude!: number;
  longitude!: number;
}
