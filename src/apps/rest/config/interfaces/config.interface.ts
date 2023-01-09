import { IConfigSchema } from './config-schema.interface';

export interface IConfig {
    get<T extends keyof IConfigSchema>(key: T): IConfigSchema[T];
}
