import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { HttpMethod } from '../../../../core/enums/http-method.enum.js';
import { ILogger } from '../../../../core/interfaces/logger.interface.js';
import { createJWT, fillDto } from '../../../../core/utils/common.js';
import { Component } from '../../common/const/component.js';
import { JWT_ALGORITM } from '../../common/const/jwt-algoritm.js';
import { Controller } from '../../common/controllers/controller.js';
import { LoginUserDto } from '../../common/database/dto/login-user-dto.js';
import HttpError from '../../common/error/http-error.js';
import { IConfig } from '../../config/interfaces/config.interface';
import LoggedUserResponse from './response/logged-user.response.js';
import { IUserService } from './user-service.interface.js';


@injectable()
export class UserController extends Controller {
  constructor(
    @inject(Component.ILogger) logger: ILogger,
    @inject(Component.IConfig) private configService: IConfig,
    @inject(Component.IUserService) private userService: IUserService

  ) {
    super(logger);
    this.logger.info('Register for offer controller');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login });
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.check });
    this.addRoute({ path: '/delete', method: HttpMethod.Post, handler: this.delete });
  }

  public create(req: Request, res: Response): void {
    //Code
    console.log(req, res);
  }

  public async login({body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>, res: Response): Promise<void> {
    const user = await this.userService.verify(body, this.configService.get('SALT'));
    if (!user) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED', 'UserController');
    }

    const token = await createJWT(
      JWT_ALGORITM,
      this.configService.get('JWT_SECRET'),
      { email: user.email, id: user.id}
    );

    this.ok(res, fillDto(LoggedUserResponse, { email: user.email, token}));

  }

  public check(req: Request, res: Response): void {
    console.log(req, res);
    //Code
  }

  public delete(req: Request, res: Response): void {
    console.log(req, res);
    //Code
  }
}

