import 'reflect-metadata';
import { Container } from 'inversify';
import { ILogger } from '../../core/index.js';
import App from './app/app.js';
import { Component } from './common/const/component.js';
import LoggerService from './common/services/logger-service.js';
import { IConfig } from './config/interfaces/config.interface.js';
import ConfigService from './config/services/config-service.js';

async function start(): Promise<void> {
  const appContainer = new Container();
  appContainer.bind<App>(Component.App).to(App).inSingletonScope();
  appContainer.bind<ILogger>(Component.ILogger).to(LoggerService).inSingletonScope();
  appContainer.bind<IConfig>(Component.IConfig).to(ConfigService).inSingletonScope();

  const app = appContainer.get<App>(Component.App);
  await app.init();
}

start();


