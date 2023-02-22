import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import { inject } from 'inversify';
import { ILogger } from '../../../../core/interfaces/logger.interface.js';
import { Component } from '../../common/const/component.js';
import { CreateCommentsDto } from '../../common/database/dto/create-comment-dto.js';
import { CommentEntity } from '../../common/database/entities/comment.entity';
import { ICommentService } from './comment-service.interface';

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 50;
export class CommentService implements ICommentService {
  constructor(
        @inject(Component.CommentModel) private commentModel: ModelType<CommentEntity>,
        @inject(Component.ILogger) private logger: ILogger
  ) {}

  public async create(dto: CreateCommentsDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info('Comment created');
    return comment.populate('userId');
  }
  //63cd3d86e078f4c47a75cbdc,
  //63cd3d86e078f4c47a75cbd3

  public async findByOfferId(offerId: string, offset: number = DEFAULT_OFFSET, limit: number = DEFAULT_LIMIT): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.aggregate([
      {
        $match: {
          offerId
        }
      }
    ])
      .skip(offset)
      .limit(limit);
  }


}
