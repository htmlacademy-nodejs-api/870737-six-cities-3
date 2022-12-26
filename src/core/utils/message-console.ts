import chalk from 'chalk';

export default class MessageConsole {
  public static info(message: string): void {
    console.log(chalk.blue(message));
  }

  public static success(message: string): void {
    console.log(chalk.green(message));
  }

  public static error(message: string): void {
    console.log(chalk.red(message));
  }
}
