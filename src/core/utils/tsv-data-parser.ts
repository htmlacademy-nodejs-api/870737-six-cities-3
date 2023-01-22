import { ApartamentTypes } from '../enums/apartaments-type.enum';
import { IOffer } from '../interfaces/offer.interface';


export default class TSVDataParser {
  public static parseRecord(record: string): IOffer {
    const data: string[] = record.replace('\n', '').split('\t');
    const [
      name,
      description,
      createdDate,
      cityName,
      cityLatitude,
      cityLongitude,
      previewImage,
      photos,
      isPremium,
      isFavorite,
      rate,
      type,
      roomsCount,
      guestCount,
      authorName,
      authorEmail,
      authorAvatar,
      authorPassword,
      isPro,
      price,
      facilities,
      commentsCount,
      latitude,
      longitude
    ] = data;
    return {
      name,
      description,
      createdAt: createdDate,
      city: {
        name: cityName,
        latitude: Number.parseFloat(cityLatitude),
        longitude: Number.parseFloat(cityLongitude)
      },
      previewImage,
      photos: photos.split(';') as string[],
      isPremium: Boolean(isPremium),
      isFavorite: Boolean(isFavorite),
      rate: Number(rate),
      type: type as ApartamentTypes,
      roomsCount: Number.parseInt(roomsCount, 10),
      guestCount: Number.parseInt(guestCount, 10),
      author: {
        name: authorName,
        email: authorEmail,
        avatar: authorAvatar,
        password: authorPassword,
        isPro: Boolean(isPro)
      },
      price: Number.parseInt(price, 10),
      facilities: facilities.split(';').map((element) => ({ name: element})),
      commentsCount: Number.parseInt(commentsCount, 10),
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude)
    };
  }
}
