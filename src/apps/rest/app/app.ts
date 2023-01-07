import { ILogger } from '../../../core';

export default class App {
  constructor(private logger: ILogger) {}

  public async init(): Promise<void> {
    this.logger.info('Application init');
  }
}
