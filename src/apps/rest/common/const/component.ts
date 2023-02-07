export const Component = {
  App: Symbol.for('App'),
  ILogger: Symbol.for('ILogger'),
  IConfig: Symbol.for('IConfig'),
  IDatabaseConnector: Symbol.for('IDatabaseConnector'),
  IUserService: Symbol.for('IUserService'),
  UserModel: Symbol.for('UserModel'),
  IFacilityService: Symbol('IFacilityService'),
  FacilityModel: Symbol.for('FacilityModel'),
  ICityService: Symbol.for('ICityService'),
  CityModel: Symbol.for('CityModel'),
  IOfferService: Symbol.for('IOfferService'),
  OfferModel: Symbol.for('OfferModel'),
  CommentModel: Symbol.for('CommentModel'),
  ICommentService: Symbol.for('ICommentService')
} as const;
