import EventEmitter from 'events';
import MessageConsole from '../../../core/utils/message-console.js';
import { IFileReader } from '../interfaces/file-reader.interface.js';
import { createReadStream } from 'fs';


export default class TSVFileReader extends EventEmitter implements IFileReader {

  constructor(public filePath: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filePath, {
      highWaterMark: 16384,
      encoding: 'utf-8',
      autoClose: true
    });
    let importedRecordsCount = 0;
    let endLinePosition = -1;
    let readeableLine = '';


    readStream.on('data', (chunk: Buffer) => {
      readeableLine += chunk.toString();
      while(readeableLine.indexOf('\n') >= 0) {
        endLinePosition = readeableLine.indexOf('\n');
        const record: string = readeableLine.slice(0, endLinePosition + 1);
        readeableLine = readeableLine.slice(++endLinePosition);
        importedRecordsCount++;
        this.emit('record', record);
      }

    });

    readStream.on('error', (err) => {
      MessageConsole.error(`Error on read file ${this.filePath}`);
      console.log(err);
    });

    readStream.on('end', () => {
      if (importedRecordsCount) {
        this.emit('end', importedRecordsCount);
      }
    });

  }
}
