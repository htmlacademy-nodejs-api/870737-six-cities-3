import { config, DotenvConfigOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { ILogger } from '../../../../core';
import { Component } from '../../common/const/component.js';
import { configSchema } from '../config-schema.js';
import { IConfigSchema } from '../interfaces/config-schema.interface';
import { IConfig } from '../interfaces/config.interface';

@injectable()
export default class ConfigService implements IConfig {
  private config: IConfigSchema;
  private logger: ILogger;

  constructor(@inject(Component.ILogger) logger: ILogger) {
    this.logger = logger;

    const configOutput: DotenvConfigOutput = config();
    if (configOutput.error) {
      this.logger.error('Error on read .env config file');
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }
    configSchema.load({});
    configSchema.validate({allowed: 'strict', output: this.logger.info});
    this.config = configSchema.getProperties();
    this.logger.info('.env file successfully parsed');
  }

  public get<T extends keyof IConfigSchema>(key: T): IConfigSchema[T] {
    return this.config[key];
  }
}
