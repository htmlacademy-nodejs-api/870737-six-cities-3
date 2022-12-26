import { ApartamentTypes } from '../enums/apartaments-type.enum';
import { Facilities } from '../enums/facilities.enum';
import { ICity } from './city.interface';
import { ICoordinates } from './coordinates.interface';
import { IUser } from './user.interface';

export interface IOffer {
    name: string;
    description: string;
    createdDate: string;
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
    facilities: Facilities[];
    commentsCount: number;
    coordinates: ICoordinates;
}
