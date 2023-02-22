import express, {Express} from 'express';
import { inject, injectable } from 'inversify';
import { IController } from '../../../core/interfaces/controller.interface.js';
import { ILogger } from '../../../core/interfaces/logger.interface.js';
import DatabaseHelper from '../../../core/utils/database-helper.js';
import { Component } from '../common/const/component.js';
import { IDatabaseConnector } from '../common/database/database-connector.interface';
import { IExceptionFilter } from '../common/error/exception-filter.interface';
import { AuthenticateMiddleware } from '../common/middlewares/authentificate.middleware.js';
import { IConfig } from '../config/interfaces/config.interface';
import { CommentController } from '../modules/comment/comment-controller.js';
import { UserController } from '../modules/user/user-controller.js';
import cors from 'cors';
@injectable()
export default class App {
  private expressApp: Express;
  constructor(
    @inject(Component.ILogger) private logger: ILogger,
    @inject(Component.IConfig) private config: IConfig,
    @inject(Component.IDatabaseConnector) private databaseConnector: IDatabaseConnector,
    @inject(Component.OfferController) private offerController: IController,
    @inject(Component.UserController) private userController: UserController,
    @inject(Component.CommentController) private commentController: CommentController,
    @inject(Component.IExceptionFilter) private exceptionFilter: IExceptionFilter
  ) {
    this.expressApp = express();
  }

  public initMiddleware(): void {
    this.expressApp.use(cors());
    const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'));
    this.expressApp.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.expressApp.use(express.json());
  }

  public initExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public initRoutes(): void {
    this.expressApp.use('/offers', this.offerController.router);
    this.expressApp.use('/users', this.userController.router);
    this.expressApp.use('/comments', this.commentController.router);
  }

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

    this.initRoutes();
    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
  }
}

