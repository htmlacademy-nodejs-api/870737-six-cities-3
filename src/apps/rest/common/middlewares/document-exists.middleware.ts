import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import HttpError from '../error/http-error.js';
import { IDocumentExistService } from '../../../../core/interfaces/document-exists.interface.js';
import { IMiddleware } from '../../../../core/interfaces/middleware.interface.js';

export class DocumentExistsMiddleware implements IMiddleware {
  constructor(
    private readonly service: IDocumentExistService,
    private readonly entityName: string,
    private readonly paramName: string,
  ) {}

  public async execute({params}: Request, _res: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.paramName];
    if (!await this.service.exists(documentId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${this.entityName} with ${documentId} not found.`,
        'DocumentExistsMiddleware'
      );
    }

    next();
  }
}
