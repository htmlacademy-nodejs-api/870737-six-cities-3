import convict from 'convict';
import { IConfigSchema } from './interfaces/config-schema.interface';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export const configSchema = convict<IConfigSchema>({
  PORT: {
    doc: 'Incoming connections port',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'Host ip address for MongoDb',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
  DB_USER: {
    doc: 'Username to connect database',
    format: String,
    env: 'DB_USER',
    default: null
  },
  DB_PASSWORD: {
    doc: 'Password to connect database',
    format: String,
    env: 'DB_PASSWORD',
    default: null
  },
  DB_PORT: {
    doc: 'Port to connect database',
    format: 'port',
    env: 'DB_PORT',
    default: 27017
  },
  DB_NAME: {
    doc: 'Application database name(Mongo)',
    format: String,
    env: 'DB_NAME',
    default: 'test'
  },
  JWT_SECRET: {
    doc: 'Secret for sign JWT',
    format: String,
    env: 'JWT_SECRET',
    default: null
  }
});
