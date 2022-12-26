import { ICliCommand } from '../interfaces/cli-command.interface';

export interface ICommandParse {
    [command: string]: string[]
}

export default class CliAppManager {
  private commands: {[commandName: string]: ICliCommand} = {};
  private defaultCommand = '--help';

  constructor(commands: ICliCommand[]) {
    this.initCommands(commands);
  }

  public initCommands(commands: ICliCommand[]): void {
    this.commands = commands.reduce((acc, command) => {
      acc[command.name] = command;
      return acc;
    }, this.commands);
  }

  private parseCommand(args: string[]): ICommandParse {
    const parsedCommand: ICommandParse = {};
    let command = '';
    return args.reduce((acc, arg) => {
      if (arg.startsWith('--')) {
        command = arg;
        parsedCommand[command] = [];
      } else if (command && arg) {
        parsedCommand[command].push(arg);
      }

      return acc;
    }, parsedCommand);
  }

  public getCommand(commandName: string): ICliCommand {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand(args: string[]): void {
    const parseCommand: ICommandParse = this.parseCommand(args);
    const [commandName]: string[] = Object.keys(parseCommand);
    const command: ICliCommand = this.getCommand(commandName);
    const commandArgs: string[] = parseCommand[commandName] || [];
    command.execute(...commandArgs);
  }
}
