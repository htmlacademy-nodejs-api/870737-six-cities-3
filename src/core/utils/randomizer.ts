import dayjs from 'dayjs';

const MIN_NUM = 0;
const MAX_NUM = 10;
const MAX_BOOL = 1;
const MIN_BOOL = 0;
const COORDS_MIN = -100;
const COORDS_MAX = 100;
const COORDS_STEP = 0.000001;
const DATE_INTERVAL_START = 1;
const DATE_INTERAVL_END = 7;
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default class Randomizer {
  public static getIntNumber(min: number = MIN_NUM, max: number = MAX_NUM): number {
    const randomNum: number = min + Math.round((Math.random() * (max - min)));
    return randomNum;
  }

  public static getBoolean(): boolean {
    return !!Randomizer.getIntNumber(MIN_BOOL, MAX_BOOL);
  }

  public static getArrElem<T>(arr: T[]): T {
    const index: number = Randomizer.getIntNumber(MIN_NUM, arr.length - 1);
    return arr[index];
  }

  public static getArrElements<T>(arr: T[]): T[] {
    const startPosition: number = Randomizer.getIntNumber(0, arr.length - 2);
    const endPosition: number = Randomizer.getIntNumber(startPosition + 1, arr.length - 1);
    return arr.slice(startPosition, endPosition);
  }

  public static getStr(strLength: number): string {
    let resStr = '';
    for (let i = 0; i < strLength; i++) {
      resStr += CHARS.charAt(Randomizer.getIntNumber(0, strLength - 1));
    }
    return resStr;
  }

  public static getCoordsDifference(): number {
    return Randomizer.getIntNumber(COORDS_MIN, COORDS_MAX) * COORDS_STEP;
  }

  public static getISODate(): string {
    const date: string = dayjs()
      .subtract(
        Randomizer.getIntNumber(
          DATE_INTERVAL_START,
          DATE_INTERAVL_END))
      .toISOString();
    return date;
  }
}
