export interface IFileWriter {
    filePath: string;
    write(record: string): Promise<void>;
}
