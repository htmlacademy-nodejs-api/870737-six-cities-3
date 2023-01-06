import { ICliCommand } from '../interfaces/cli-command.interface';
import { IOfferMockData } from '../interfaces/offer-mock-data.interface';
import got from 'got';
import OfferGenerator from '../classes/offer-generator.js';
import { appendFile } from 'fs/promises';
import MessageConsole from '../../../core/utils/message-console.js';


export default class GenerateCommand implements ICliCommand {
  public readonly name = '--generate';
  private initialData!: IOfferMockData;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filePath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);
    try {
      this.initialData = await got.get<IOfferMockData>(url).json();
      const offerGenerator = new OfferGenerator(this.initialData);
      for (let i = 0; i < offerCount; i++) {
        await appendFile(filePath, `${offerGenerator.generateTsvStr()}\n`, 'utf-8');
      }
      MessageConsole.success(`In file ${filePath} ${offerCount} records were successfully appended`);
    } catch {
      console.log(`Error on fetch data from ${url}`);
    }
  }
}
