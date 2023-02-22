import 'reflect-metadata';
import { DocumentType, types } from '@typegoose/typegoose';
import CreateUserDto from '../../common/database/dto/create-user-dto.js';
import { UserEntity } from '../../common/database/entities/user.entity.js';
import { IUserService } from './user-service.interface';
import { inject, injectable } from 'inversify';
import { Component } from '../../common/const/component.js';
import { LoginUserDto } from '../../common/database/dto/login-user-dto.js';
import { ILogger } from '../../../../core/interfaces/logger.interface.js';

@injectable()
export default class UserService implements IUserService {
  constructor(
    @inject(Component.ILogger) private logger: ILogger,
    @inject(Component.UserModel) private userModel: types.ModelType<UserEntity>) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const resultUserRecord = this.userModel.create(user);
    this.logger.info(`New user created ${user.email}`);
    return resultUserRecord;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email}).exec();
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedRecord = await this.findByEmail(dto.email);

    if (existedRecord) {
      return existedRecord;
    }

    return this.create(dto, salt);
  }

  public async verify(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByEmail(dto.email);
    if (!user) {
      return null;
    }

    if (user.verifyPassword(dto.password, salt)) {
      return user;
    }

    return null;
  }
}
