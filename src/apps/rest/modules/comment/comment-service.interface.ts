import { DocumentType } from '@typegoose/typegoose';
import { CreateCommentsDto } from '../../common/database/dto/create-comment-dto.js';
import { CommentEntity } from '../../common/database/entities/comment.entity.js';

export interface ICommentService {
    create(dto: CreateCommentsDto): Promise<DocumentType<CommentEntity>>;
    findByOfferId(offerId: string, offset: number, limit: number): Promise<DocumentType<CommentEntity>[]>;
}
