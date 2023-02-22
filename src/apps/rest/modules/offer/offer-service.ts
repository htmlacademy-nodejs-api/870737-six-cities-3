import { DocumentType, mongoose, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { IDocumentExistService } from '../../../../core/interfaces/document-exists.interface.js';
import { ILogger } from '../../../../core/interfaces/logger.interface.js';
import { Component } from '../../common/const/component.js';
import { CreateOfferDto } from '../../common/database/dto/create-offer-dto.js';
import { UpdateOfferDto } from '../../common/database/dto/update-offer-dto.js';
import { OfferEntity } from '../../common/database/entities/offer.entity';
import { IOfferService } from './offer-service.interface';

const DEFAULT_LIMIT = 60;
const DEFAULT_OFFSET = 0;
const DEFAULT_PREMIUM_LIMIT = 3;
@injectable()
export class OfferService implements IOfferService, IDocumentExistService {
  constructor(
        @inject(Component.ILogger) private logger: ILogger,
        @inject(Component.OfferModel) private offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async find(offset?: number, limit?: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'cities',
            localField: 'city',
            foreignField: '_id',
            as: 'city',
            pipeline: [
              {
                $project: {
                  '_id': 0,
                  'createdAt': 0,
                  'updatedAt': 0,
                  '__v': 0
                }
              }
            ]
          }
        }, {
          $unwind: {
            path: '$city'
          }
        }, {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            as: 'comments'
          }
        }, {
          $project: {
            id: 1,
            name: 1,
            type: 1,
            isFavorite: 1,
            createdAt: 1,
            city: 1,
            previewImage: 1,
            isPremium: 1,
            rate: {
              $avg: '$comments.rate'
            },
            commentsCount: {
              $size: '$comments'
            }
          }
        }
      ])
      .skip(offset || DEFAULT_OFFSET)
      .limit(limit || DEFAULT_LIMIT)
      .exec();
  }

  public findPremium(cityName: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.aggregate(
      [
        {
          $lookup: {
            from: 'cities',
            localField: 'city',
            foreignField: '_id',
            as: 'city',
            pipeline: [
              {
                $project: {
                  _id: 0,
                  createdAt: 0,
                  updatedAt: 0,
                  __v: 0
                }
              }
            ]
          }
        },
        {
          $unwind: {
            path: '$city'
          }
        },
        {
          $match: {
            'city.name': cityName,
            'isPremium': true
          }
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            as: 'comments'
          }
        },
        {
          $project: {
            _id: 1,
            name: 1,
            type: 1,
            isFavorite: 1,
            createdAt: 1,
            city: 1,
            previewImage: 1,
            isPremium: 1,
            rate: {
              '$avg': '$comments.rate'
            },
            commentsCount: {
              '$size': '$comments'
            }
          }
        }
      ]
    ).skip(DEFAULT_PREMIUM_LIMIT).exec();
  }

  public findFavorite(userId: string, offset: number, limit: number): Promise<DocumentType<OfferEntity, types.BeAnObject>[]> {
    return this.offerModel
      .aggregate([
        {
          $match: {
            authorId: userId,
            isFavorite: true
          },
          $lookup: {
            from: 'cities',
            localField: 'city',
            foreignField: '_id',
            as: 'city',
            pipeline: [
              {
                $project: {
                  '_id': 0,
                  'createdAt': 0,
                  'updatedAt': 0,
                  '__v': 0
                }
              }
            ]
          }
        }, {
          $unwind: {
            path: '$city'
          }
        }, {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            as: 'comments'
          }
        }, {
          $project: {
            _id: 1,
            name: 1,
            type: 1,
            isFavorite: 1,
            createdAt: 1,
            city: 1,
            previewImage: 1,
            isPremium: 1,
            rate: {
              $avg: '$comments.rate'
            },
            commentsCount: {
              $size: '$comments'
            }
          }
        }
      ])
      .skip(offset)
      .limit(limit)
      .exec();
  }

  public async create(dto: CreateOfferDto): Promise<types.DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`Offer ${dto.name} record created`);
    return result;
  }

  public async updateById(dto: UpdateOfferDto, offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, dto, {new: true}).exec();
  }

  public async exists(id: string): Promise<boolean> {
    const offer = await this.offerModel.findById(id);

    if (offer) {
      return true;
    }

    return false;
  }

  public async deleteById(offerId: string): Promise<types.DocumentType<OfferEntity, types.BeAnObject> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async findById(offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    const offersById = await this.offerModel.aggregate(
      [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(offerId)
          }
        }, {
          $lookup: {
            from: 'cities',
            localField: 'city',
            foreignField: '_id',
            as: 'city',
            pipeline: [
              {
                $project: {
                  _id: 0,
                  createdAt: 0,
                  updatedAt: 0,
                  __v: 0
                }
              }
            ]
          }
        },
        {
          $unwind: {
            path: '$city'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'authorId',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: {
            path: '$user'
          }
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            as: 'comments'
          }
        },
        {
          $lookup: {
            from: 'facilities',
            localField: 'facilities',
            foreignField: '_id',
            as: 'facilities',
            pipeline: [
              {
                $project: {
                  'id': 1,
                  'name': 1
                }
              }
            ]
          }
        },
        {
          '$project': {
            '_id': 1,
            'name': 1,
            'type': 1,
            'isFavorite': 1,
            'createdAt': 1,
            'city': 1,
            'previewImage': 1,
            'isPremium': 1,
            'facilities': 1,
            'description': 1,
            'photos': 1,
            'roomsCount': 1,
            'guestCount': 1,
            'user': 1,
            'latitude': 1,
            'longitude': 1,
            'rate': {
              '$avg': '$comments.rate'
            },
            'commentsCount': {
              '$size': '$comments'
            }
          }
        }
      ]
    );
    if (offersById && offersById?.length) {
      return offersById[0];
    }
    return null;
  }
}
