import { DocumentType } from '@typegoose/typegoose';
import CreateUserDto from '../../common/database/dto/create-user-dto.js';
import { UserEntity } from '../../common/database/entities/user.entity';

export interface IUserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
}
