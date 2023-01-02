import { ApartamentTypes, Facilities } from "../../../core";

export interface IOfferMockData {
    names: string[],
    descriptions: string[],
    cities: string[],
    types: ApartamentTypes[],
    facilities: Facilities[],
    authorNames: string[],
    emails: string[],
    photos: string[],
    avatars: string[],
    cityCoords: { [city: string]: { latitude: number, longitude: number }}
}