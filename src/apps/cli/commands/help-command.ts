import chalk from 'chalk';
import { ICliCommand } from '../interfaces/cli-command.interface';

export default class HelpCommand implements ICliCommand {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
        ${chalk.hex('#a05bf9')('Программа для подготовки данных для REST API сервера.')}

        ${chalk.hex('#a05bf9')('Пример:')}

            ${chalk.hex('#0455d8')('main.js --<command> [--arguments]')}

            ${chalk.hex('#a05bf9')('Команды:')}      
            ${chalk.green('--version:')}                       ${chalk.hex('#0455d8')('# выводит номер версии')}
            ${chalk.green('--help:')}                          ${chalk.hex('#0455d8')('# печатает этот текст')}
            ${chalk.green('--import <path>:')}                 ${chalk.hex('#0455d8')('# импортирует данные из TSV')}
            ${chalk.green('--generate <n> <path> <url>')}      ${chalk.hex('#0455d8')('# генерирует произвольное количество тестовых данных')}
        `);
  }

}
