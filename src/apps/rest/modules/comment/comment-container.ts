import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Component } from '../../common/const/component.js';
import { CommentEntity, CommentModel } from '../../common/database/entities/comment.entity.js';
import { CommentService } from './comment-service.js';
import { ICommentService } from './comment-service.interface';
import { IController } from '../../../../core/interfaces/controller.interface.js';
import { CommentController } from './comment-controller.js';

const commentContainer = new Container();

commentContainer.bind<ICommentService>(Component.ICommentService).to(CommentService);
commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
commentContainer.bind<IController>(Component.CommentController).to(CommentController).inSingletonScope();

export { commentContainer };

