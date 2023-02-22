import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { ILogger } from '../../../../core/interfaces/logger.interface.js';
import { Component } from '../const/component.js';
import { IDatabaseConnector } from './database-connector.interface';
@injectable()
export default class DatabaseConnectionService implements IDatabaseConnector {
  constructor(@inject(Component.ILogger) private logger: ILogger) {}

  public async connect(uri: string): Promise<void> {
    this.logger.info('Try to connect to MongoDB…');
    await mongoose.connect(uri);
    this.logger.info('Database connection established.');
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.logger.info('Database connection closed');
  }
}
