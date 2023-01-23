import { Container } from 'inversify';
import { Component } from '../../common/const/component.js';
import UserService from './user-service.js';
import {types} from '@typegoose/typegoose';
import { IUserService } from './user-service.interface';
import { UserEntity, UserModel } from '../../common/database/entities/user.entity.js';
const userContainer = new Container();

userContainer.bind<IUserService>(Component.IUserService).to(UserService).inSingletonScope();
userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

export { userContainer };
