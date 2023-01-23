import crypto from 'crypto';

export default class DatabaseHelper {
  public static getUri(
    username: string,
    password: string,
    host: string,
    port: number,
    databaseName: string): string {
    return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
  }

  public static createSha256(str: string, salt: string): string {
    const shaHasher = crypto.createHmac('sha256', salt);
    return shaHasher.update(str).digest('hex');
  }
}
