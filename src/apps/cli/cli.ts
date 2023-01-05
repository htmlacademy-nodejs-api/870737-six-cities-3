//#!/usr/bin/env node

import CliAppManager from './classes/cli-app-manager.js';
import GenerateCommand from './commands/generate-command.js';
import HelpCommand from './commands/help-command.js';
import ImportCommand from './commands/import-command.js';
import VersionCommand from './commands/version-command.js';

const manager: CliAppManager = new CliAppManager(
  [
    new VersionCommand(),
    new HelpCommand(),
    new ImportCommand(),
    new GenerateCommand()
  ]
);

manager.processCommand(process.argv);
