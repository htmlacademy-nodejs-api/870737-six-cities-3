import { ApartamentTypes } from '../../../core/enums/apartament-types.enum.js';
import { ICity } from '../../../core/interfaces/city.interface.js';
import { IFacility } from '../../../core/interfaces/facility.interface.js';
import { IOffer } from '../../../core/interfaces/offer.interface.js';
import { IUser } from '../../../core/interfaces/user.interface.js';
import Randomizer from '../../../core/utils/randomizer.js';
import { IOfferGenerator } from '../interfaces/offer-generator.interface';
import { IOfferMockData } from '../interfaces/offer-mock-data.interface';


const MAX_RATE = 5;
const MAX_ROOMS = 8;
const MAX_GUEST_COUNT = 10;
const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_INT_COUNT = 1;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 12;
export default class OfferGenerator implements IOfferGenerator {
  constructor(private readonly mockOfferData: IOfferMockData) {
  }

  public generateItem(): IOffer {
    const {
      names,
      descriptions,
      cities,
      types,
      goods,
      authorNames,
      emails,
      images,
      avatars,
      cityCoords
    }: IOfferMockData = this.mockOfferData;
    const name: string = Randomizer.getArrElem<string>(names);
    const description: string = Randomizer.getArrElem<string>(descriptions);
    const cityName: string = Randomizer.getArrElem<string>(cities);
    const city: ICity = {
      name: Randomizer.getArrElem(cities),
      latitude: cityCoords[cityName].latitude,
      longitude: cityCoords[cityName].longitude
    };
    const previewImage: string = Randomizer.getArrElem<string>(images);
    const photos: string[] = Randomizer.getArrElements<string>(images);
    const isPremium: boolean = Randomizer.getBoolean();
    const isFavorite: boolean = Randomizer.getBoolean();
    const rate: number = Randomizer.getIntNumber(MIN_INT_COUNT, MAX_RATE);
    const type: ApartamentTypes = Randomizer.getArrElem<ApartamentTypes>(types);
    const roomsCount: number = Randomizer.getIntNumber(MIN_INT_COUNT, MAX_ROOMS);
    const guestCount: number = Randomizer.getIntNumber(MIN_INT_COUNT, MAX_GUEST_COUNT);
    const author: IUser = {
      name: Randomizer.getArrElem<string>(authorNames),
      email: Randomizer.getArrElem<string>(emails),
      avatar: Randomizer.getArrElem<string>(avatars),
      password: Randomizer.getStr(Randomizer.getIntNumber(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH)),
      isPro: Randomizer.getBoolean()
    };
    const price: number = Randomizer.getIntNumber(MIN_PRICE, MAX_PRICE);
    const facilities: IFacility[] = Randomizer.getArrElements<string>(goods).map((element) => ({ name: element}));
    const createdDate: string = Randomizer.getISODate();
    const commentsCount: number = Randomizer.getIntNumber(MIN_INT_COUNT);
    const latitude: number = city.latitude + Randomizer.getCoordsDifference();
    const longitude: number = city.longitude + Randomizer.getCoordsDifference();
    return {
      name,
      description,
      createdAt: createdDate,
      city,
      previewImage,
      photos,
      isPremium,
      isFavorite,
      rate,
      type,
      roomsCount,
      guestCount,
      author,
      price,
      facilities,
      commentsCount,
      latitude,
      longitude
    };
  }

  public generateTsvStr(): string {

    const offer: IOffer = this.generateItem();
    const {
      name,
      description,
      createdAt: createdDate,
      city,
      previewImage,
      photos,
      isPremium,
      isFavorite,
      rate,
      type,
      roomsCount,
      guestCount,
      author,
      price,
      facilities,
      commentsCount,
      latitude,
      longitude
    }: IOffer = offer;
    return [
      name,
      description,
      createdDate,
      city.name,
      city.latitude.toString(),
      city.longitude.toString(),
      previewImage,
      photos.join(';'),
      isPremium,
      isFavorite,
      rate.toString(),
      type,
      roomsCount.toString(),
      guestCount.toString(),
      author.name,
      author.email,
      author.avatar,
      author.password,
      author.isPro.toString(),
      price,
      facilities.map((element) => element.name ).join(';'),
      commentsCount.toString(),
      latitude.toString(),
      longitude.toString()
    ].join('\t');
  }
}
