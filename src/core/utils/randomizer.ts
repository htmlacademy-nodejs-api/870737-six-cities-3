const MIN_NUM = 0;
const MAX_NUM = 10;
const MAX_BOOL = 1;
const MIN_BOOL = 0;
const STR_EMAIL_NUM = 5;
const COORDS_MIN = -100;
const COORDS_MAX = 100;
const COORDS_STEP = 0.000001;
const CHARS ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default class Randomizer {
    public static getIntNumber(min: number = MIN_NUM, max: number = MAX_NUM): number {
        const randomNum: number = min + Math.round((Math.random() * (max - min)));
        return randomNum;
    }

    public static getBoolean(): boolean {
        return !!Randomizer.getIntNumber(MIN_BOOL, MAX_BOOL);
    }

    public static getRandArrElemM<T>(arr: T[]): T {
        const index: number = Randomizer.getIntNumber(MIN_NUM, arr.length - 1);
        return arr[index];
    }

    public static getStr(strLength: number): string {
        let resStr = '';
        for (let i = 0; i < strLength; i++) {
            resStr += CHARS.charAt(Randomizer.getIntNumber(0, strLength - 1));
        }
        return resStr;
    }

    public getEmail(emailStr: string): string {
        const emailArr: string[] = emailStr.split('@');
        emailArr[0] += Randomizer.getStr(STR_EMAIL_NUM);
        return emailArr.join('@');
    }

    public getCoordsDifference(): number {
        return Randomizer.getIntNumber(COORDS_MIN, COORDS_MAX) * COORDS_STEP;
    }
}