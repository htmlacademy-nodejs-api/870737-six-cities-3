import { IFacility, ILogger, IOffer } from '../../../core';
import TSVDataParser from '../../../core/utils/tsv-data-parser.js';
import MessageConsole from '../../../core/utils/message-console.js';
import TSVFileReader from '../classes/tsv-file-reader.js';
import { ICliCommand } from '../interfaces/cli-command.interface';
import ConsoleLoggerService from '../../rest/common/services/console-logger-service.js';
import { IFacilityService } from '../../rest/modules/facility/facility-service.interface';
import { IUserService } from '../../rest/modules/user/user-service.interface';
import { IOfferService } from '../../rest/modules/offer/offer-service.interface';
import { IDatabaseConnector } from '../../rest/common/database/database-connector.interface';
import { ICityService } from '../../rest/modules/city/city-service.interface';
import { OfferService } from '../../rest/modules/offer/offer-service.js';
import { OfferModel } from '../../rest/common/database/entities/offer.entity.js';
import { FacilityService } from '../../rest/modules/facility/facility-service.js';
import { FacilityModel } from '../../rest/common/database/entities/facility.entity.js';
import UserService from '../../rest/modules/user/user-service.js';
import { UserModel } from '../../rest/common/database/entities/user.entity.js';
import { CityService } from '../../rest/modules/city/city-service.js';
import { CityModel } from '../../rest/common/database/entities/city.entity.js';
import DatabaseConnectionService from '../../rest/common/database/database-connection-service.js';
import DatabaseHelper from '../../../core/utils/database-helper.js';
import { DEFAULT_DATABASE_PORT } from '../../rest/common/const/default-database-port.const.js';

export default class ImportCommand implements ICliCommand {
  public readonly name = '--import';
  private logger: ILogger;
  private facilityService: IFacilityService;
  private userService: IUserService;
  private offerService: IOfferService;
  private cityService: ICityService;
  private databaseConnectorService: IDatabaseConnector;
  private salt!: string;


  constructor() {
    this.onReadNewRecord = this.onReadNewRecord.bind(this);
    this.onReadFileFinished = this.onReadFileFinished.bind(this);
    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.facilityService = new FacilityService(this.logger, FacilityModel);
    this.userService = new UserService(this.logger, UserModel);
    this.cityService = new CityService(this.logger, CityModel);
    this.databaseConnectorService = new DatabaseConnectionService(this.logger);
  }


  public async execute(filePath: string, login: string, password: string, host: string, databaseName: string, salt: string): Promise<void> {
    this.salt = salt;
    const uri = DatabaseHelper.getUri(login, password, host, DEFAULT_DATABASE_PORT, databaseName);
    await this.databaseConnectorService.connect(uri);
    const fileReader = new TSVFileReader(filePath.trim());
    fileReader.on('record', this.onReadNewRecord);
    fileReader.on('end', this.onReadFileFinished);
    try {
      await fileReader.read();
    } catch(err) {
      console.log(err);
      console.log('Не удалось считать данные из файла');
    }
  }

  private async saveOffer(offer: IOffer): Promise<void> {
    const { author, facilities, city }: IOffer = offer;
    const facilitiesIds: string[] = [];
    const userRecord = await this.userService.findOrCreate({...author}, this.salt);
    const cityRecord = await this.cityService.findByNameOrCreate(city.name, city);
    for (const facility of facilities) {
      const { name }: IFacility = facility;
      const facilityRecord = await this.facilityService.findByNameOrCreate(name, { name });
      facilitiesIds.push(facilityRecord.id);
    }
    console.log(userRecord.id);
    await this.offerService.create(
      {
        ...offer,
        authorId: userRecord.id,
        city: cityRecord.id,
        facilities: facilitiesIds
      });
  }

  private async onReadNewRecord(record: string, resolve: () => string): Promise<void> {
    const offer: IOffer = TSVDataParser.parseRecord(record);
    await this.saveOffer(offer);
    resolve();
  }

  private async onReadFileFinished(recordsCount: number): Promise<void> {
    this.databaseConnectorService.disconnect();
    MessageConsole.success(`Import ${recordsCount.toString()} records succesfully finished`);
  }
}
