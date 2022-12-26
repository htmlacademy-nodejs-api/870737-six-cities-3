import { IUser } from './user.interface';

export interface IComment {
    text: string;
    createdDate: string;
    rate: number;
    author: IUser;
}
