import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions
} from '@typegoose/typegoose';
import { IUser } from '../../../../../core';
import DatabaseHelper from '../../../../../core/utils/database-helper.js';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements IUser {
  @prop({ required: true, default: ''})
  public name!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true, default: ''})
  public avatar!: string;

  @prop({ required: true, default: false})
  public isPro!: boolean;

  @prop({ required: true, default: ''})
  public password!: string;

  constructor(user: IUser) {
    super();
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.avatar = user.avatar;
    this.isPro = user.isPro;

  }

  public setPassword(password: string, salt: string): void {
    this.password = DatabaseHelper.createSha256(password, salt);
  }

  public getPassword(): string {
    return this.password;
  }

}


export const UserModel = getModelForClass(UserEntity);
