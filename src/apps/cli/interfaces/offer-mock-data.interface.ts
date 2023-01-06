import { ApartamentTypes, Facilities } from '../../../core';

export interface IOfferMockData {
    names: string[],
    descriptions: string[],
    cities: string[],
    types: ApartamentTypes[],
    goods: Facilities[],
    authorNames: string[],
    emails: string[],
    images: string[],
    avatars: string[],
    cityCoords: { [city: string]: { latitude: number, longitude: number }}
}
