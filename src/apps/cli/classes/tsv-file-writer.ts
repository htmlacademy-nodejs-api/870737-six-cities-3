import { createWriteStream, WriteStream } from 'fs';
import { IFileWriter } from '../interfaces/file-writer.interface';

export class TSVFileWriter implements IFileWriter {
  private stream: WriteStream;
  constructor(public filePath: string) {
    this.stream = createWriteStream(this.filePath, {
      flags: 'w',
      encoding: 'utf-8',
      highWaterMark: 2 ** 14,
      autoClose: true
    });
  }

  public async write(record: string): Promise<void> {
    if (!this.stream.write(`${record}\n`)) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }
    return Promise.resolve();
  }
}
