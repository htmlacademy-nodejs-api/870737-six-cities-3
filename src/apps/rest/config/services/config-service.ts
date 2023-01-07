import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { ILogger } from '../../../../core';
import { IConfig } from '../interfaces/config.interface';

export default class ConfigService implements IConfig {
  private config: DotenvParseOutput;
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;

    const configOutput: DotenvConfigOutput = config();
    if (configOutput.error) {
      this.logger.error('Error on read .env config file');
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    this.config = <DotenvParseOutput>configOutput.parsed;
    this.logger.info('.env file successfully parsed');
  }

  public get (key: string): string | undefined {
    return this.config[key];
  }
}
