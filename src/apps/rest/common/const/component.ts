export const Component = {
  App: Symbol.for('App'),
  ILogger: Symbol.for('ILogger'),
  IConfig: Symbol.for('IConfig'),
  IDatabaseConnector: Symbol.for('IDatabaseConnector'),
  IUserService: Symbol.for('IUserService'),
  UserModel: Symbol.for('UserModel'),
  UserController: Symbol.for('UserController'),
  IFacilityService: Symbol('IFacilityService'),
  FacilityModel: Symbol.for('FacilityModel'),
  ICityService: Symbol.for('ICityService'),
  CityModel: Symbol.for('CityModel'),
  IOfferService: Symbol.for('IOfferService'),
  IOfferFavoriteService: Symbol.for('IOfferFavoriteService'),
  OfferModel: Symbol.for('OfferModel'),
  OfferFavoriteModel: Symbol.for('OfferFavoriteModel'),
  OfferController: Symbol.for('OfferController'),
  CommentModel: Symbol.for('CommentModel'),
  ICommentService: Symbol.for('ICommentService'),
  CommentController: Symbol.for('CommentController'),
  IExceptionFilter: Symbol.for('IExceptionFilter')
} as const;
