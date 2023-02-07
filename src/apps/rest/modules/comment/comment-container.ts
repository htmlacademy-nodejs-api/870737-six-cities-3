import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Component } from '../../common/const/component.js';
import { CommentEntity, CommentModel } from '../../common/database/entities/comment.entity';
import { CommentService } from './comment-service.js';
import { ICommentService } from './comment-service.interface';

const commentContainer = new Container();

commentContainer.bind<ICommentService>(Component.ICommentService).to(CommentService);
commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);


export { commentContainer };

