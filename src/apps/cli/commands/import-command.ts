
import { IOffer } from '../../../core/index.js';
import TSVFileReader from '../classes/tsv-file-reader.js';
import { ICliCommand } from '../interfaces/cli-command.interface';

export default class ImportCommand implements ICliCommand {
  public readonly name = '--import';

  execute(filePath: string): void {
    const fileReader = new TSVFileReader(filePath);
    try {
      fileReader.read();
      const offers: IOffer[] = fileReader.parseData();
      offers.forEach((offer: IOffer) => {
        fileReader.printItem(offer);
      });
    } catch(err) {
      console.log(err);
      console.log('Не удалось считать данные из файла');
    }
  }
}
