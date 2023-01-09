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
  }
});
