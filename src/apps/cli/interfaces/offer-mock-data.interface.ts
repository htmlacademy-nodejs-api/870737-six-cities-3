import { ApartamentTypes } from '../../../core/enums/apartament-types.enum.js';

export interface IOfferMockData {
    names: string[],
    descriptions: string[],
    cities: string[],
    types: ApartamentTypes[],
    goods: string[],
    authorNames: string[],
    emails: string[],
    images: string[],
    avatars: string[],
    cityCoords: { [city: string]: { latitude: number, longitude: number }}
}
