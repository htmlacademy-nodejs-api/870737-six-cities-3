import { ApartamentTypes } from '../enums/apartaments-type.enum';
import { ICity } from './city.interface';
import { IFacility } from './facility.interface';
import { IUser } from './user.interface';

export interface IOffer {
    name: string;
    description: string;
    createdAt: string;
    city: ICity;
    previewImage: string;
    photos: string[];
    isPremium: boolean;
    isFavorite: boolean;
    rate: number;
    type: ApartamentTypes;
    roomsCount: number;
    guestCount: number;
    author: IUser;
    price: number;
    facilities: IFacility[];
    commentsCount: number;
    latitude: number;
    longitude: number;
}
