import { Container } from 'inversify';
import { ILogger } from '../../../core';
import { Component } from '../common/const/component.js';
import DatabaseConnectionService from '../common/database/database-connection-service.js';
import { IDatabaseConnector } from '../common/database/database-connector.interface';
import LoggerService from '../common/services/logger-service.js';
import { IConfig } from '../config/interfaces/config.interface';
import ConfigService from '../config/services/config-service.js';
import App from './app.js';

const appContainer = new Container();

appContainer.bind<App>(Component.App).to(App).inSingletonScope();
appContainer.bind<ILogger>(Component.ILogger).to(LoggerService).inSingletonScope();
appContainer.bind<IConfig>(Component.IConfig).to(ConfigService).inSingletonScope();
appContainer.bind<IDatabaseConnector>(Component.IDatabaseConnector).to(DatabaseConnectionService).inSingletonScope();
export { appContainer };
