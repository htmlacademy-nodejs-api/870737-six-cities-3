import { inject, injectable } from 'inversify';
import { ILogger } from '../../../core';
import { Component } from '../common/const/component.js';
import { IConfig } from '../config/interfaces/config.interface';

@injectable()
export default class App {
  constructor(
    @inject(Component.ILogger) private logger: ILogger,
    @inject(Component.IConfig) private config: IConfig) {}

  public async init(): Promise<void> {
    this.logger.info('Application init');
    this.logger.info(`Get value fom port ${this.config.get('PORT')}`);
  }
}
