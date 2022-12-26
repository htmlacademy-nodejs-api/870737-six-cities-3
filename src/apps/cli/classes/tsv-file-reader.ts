import chalk from 'chalk';
import { readFileSync } from 'fs';
import util from 'util';
import { ApartamentTypes, Facilities, IOffer } from '../../../core/index.js';
import { IFileReader } from '../interfaces/file-reader.js';


export default class TSVFileReader implements IFileReader {
  private rawData = '';
  private customPrintColor = '#68228b';

  constructor(public filePath: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filePath, { encoding: 'utf8' });
  }

  public parseData(): IOffer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map((
        [
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
        ]) => ({
        name,
        description,
        createdDate,
        city: {
          name: cityName,
          coordinates: {
            latitude: Number.parseFloat(cityLatitude),
            longitude: Number.parseFloat(cityLongitude)
          }
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
        facilities: facilities.split(';') as Facilities[],
        commentsCount: Number.parseInt(commentsCount, 10),
        coordinates: {
          latitude: Number.parseFloat(latitude),
          longitude: Number.parseFloat(longitude)
        }
      }));
  }

  public printItem(offer: IOffer): void {
    console.log(chalk.hex(this.customPrintColor)(util.inspect(offer, {colors:true, depth:null})));
  }
}
