import { inject, injectable } from 'inversify';
import { ILogger } from '../../../core';
import DatabaseHelper from '../../../core/utils/database-helper.js';
import { Component } from '../common/const/component.js';
import { IDatabaseConnector } from '../common/database/database-connector.interface';
import { IConfig } from '../config/interfaces/config.interface';

@injectable()
export default class App {
  constructor(
    @inject(Component.ILogger) private logger: ILogger,
    @inject(Component.IConfig) private config: IConfig,
    @inject(Component.IDatabaseConnector) private databaseConnector: IDatabaseConnector) {}

  public async init(): Promise<void> {
    this.logger.info('Application init');
    this.logger.info(`Get value fom port ${this.config.get('PORT')}`);
    const uri: string = DatabaseHelper.getUri(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );
    await this.databaseConnector.connect(uri);
  }
}
