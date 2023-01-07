import App from './app/app.js';
import LoggerService from './common/services/logger-service.js';

async function start(): Promise<void> {
  const logger = new LoggerService();
  const app = new App(logger);
  await app.init();
}

start();


