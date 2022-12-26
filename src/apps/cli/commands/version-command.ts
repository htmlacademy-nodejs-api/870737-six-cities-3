import { readFileSync } from 'fs';
import MessageConsole from '../../../core/utils/message-console.js';
import { ICliCommand } from '../interfaces/cli-command.interface';

export default class VersionCommand implements ICliCommand {
  public readonly name = '--version';
  private getVersion(): string {
    const contentPackageJson: string = readFileSync('package.json', 'utf-8');
    const content = JSON.parse(contentPackageJson);
    return content.version;
  }

  public async execute(): Promise<void> {
    const version: string = this.getVersion();
    MessageConsole.info(version);
  }
}
