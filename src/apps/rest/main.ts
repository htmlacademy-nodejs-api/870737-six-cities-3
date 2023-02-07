import 'reflect-metadata';
import { Container } from 'inversify';
import App from './app/app.js';
import { Component } from './common/const/component.js';
import { appContainer } from './app/app.container.js';
import { userContainer } from './modules/user/user.container.js';
import { facilityContainer } from './modules/facility/facility-container.js';
import { cityContainer } from './modules/city/city-container.js';
import { offerContainer } from './modules/offer/offer-container.js';
import { commentContainer } from './modules/comment/comment-container.js';

async function bootstrap(): Promise<void> {
  const mainContainer = Container.merge(
    appContainer,
    userContainer,
    facilityContainer,
    cityContainer,
    offerContainer,
    commentContainer
  );
  const app = mainContainer.get<App>(Component.App);
  await app.init();
}

bootstrap();


