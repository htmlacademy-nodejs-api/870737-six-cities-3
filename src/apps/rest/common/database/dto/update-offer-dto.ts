import { ApartamentTypes } from '../../../../../core';

export class UpdateOfferDto {
  name?: string;
  description?: string;
  city?: string;
  previewImage?: string;
  photos?: string[];
  isPremium?: boolean;
  isFavorite?: boolean;
  type?: ApartamentTypes;
  roomsCount?: number;
  guestCount?: number;
  price?: number;
  facilities?: string[];
  latitude?: number;
  longitude?: number;
}

