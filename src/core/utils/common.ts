import { ClassConstructor, plainToInstance } from 'class-transformer';
import * as jose from 'jose';
import crypto from 'crypto';
export const fillDto = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});


export const createErrorObject = (message: string) => ({
  error: message,
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algoritm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
