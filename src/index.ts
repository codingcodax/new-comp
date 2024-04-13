#!/usr/bin/env node
import { Command, Option } from 'commander';

import packageJson from '../package.json';
import { getConfig } from '~/helpers/getConfig';
const config = getConfig();

const program = new Command();

const init = () => {
  program
    .name(packageJson.name)
    .description(packageJson.description)
    .version(packageJson.version, '-v, --version', 'Display version number')
    .addOption(
      new Option('-l, --lang <language>', 'Which laguange to use').default(config.lang).choices([
        'ts',
        'js',
      ])
    ).addOption(
      new Option(
        '-t, --type <typeOfComponent>',
        'Select between function, arrow function and class component'
      )
        .default(config.type)
        .choices(['function', 'arrow', 'class'])
    ).addOption(
      new Option('--ui <uiLibrary>', 'Choose your favorite component library')
        .default(config.ui)
        .choices(['vanilla', 'chakra', 'mui'])
    )
    .addOption(
      new Option(
        '-d, --dir <pathToDirectory>',
        'Path to the "components" directory'
      ).default(config.dir)
    );

  program.parse();
};

init();
