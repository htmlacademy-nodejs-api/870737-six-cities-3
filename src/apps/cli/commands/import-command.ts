import chalk from 'chalk';
import { IOffer } from '../../../core';
import TSVDataParser from '../../../core/utils/tsv-data-parser.js';
import MessageConsole from '../../../core/utils/message-console.js';
import TSVFileReader from '../classes/tsv-file-reader.js';
import { ICliCommand } from '../interfaces/cli-command.interface';
import util from 'util';

export default class ImportCommand implements ICliCommand {
  public readonly name = '--import';

  public async execute(filePath: string): Promise<void> {
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

  private onReadNewRecord(record: string): void {
    const offer: IOffer = TSVDataParser.parseRecord(record);
    console.log(chalk.blue(util.inspect(offer, {colors:true, depth:null})));
  }

  private onReadFileFinished(recordsCount: number): void {
    MessageConsole.success(`Import ${recordsCount.toString()} records succesfully finished`);
  }
}
