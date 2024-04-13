#!/usr/bin/env node
import { readFileSync } from 'fs';
import path from 'path';
import { Command, Option } from 'commander';

import { getConfig } from '~/helpers/getConfig';

import packageJson from '../package.json';

const config = getConfig();
const program = new Command();

const initCommand = (): void => {
  program
    .name(packageJson.name)
    .summary('Create react components')
    .description(packageJson.description)
    .version(packageJson.version, '-v, --version', 'Display version number')
    .helpOption('-h, --help', 'Display help for command')
    .argument('<componentName>', 'Name of the component you want to create')
    .addOption(
      new Option('-l, --lang <language>', 'Which laguange to use')
        .default(config.lang)
        .choices(['ts', 'js'])
    )
    .addOption(
      new Option(
        '-t, --type <typeOfComponent>',
        'Select between function, arrow function and class component'
      )
        .default(config.type)
        .choices(['function', 'arrow', 'class'])
    )
    .addOption(
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

  const [componentName] = program.args;
  const options = program.opts();

  const fileExtension = options.lang === 'js' ? 'js' : 'tsx';
  const indexExtension = options.lang === 'js' ? 'js' : 'ts';
  const fileTemplatePath = `${options.type}/${options.ui}.tsx`;
  const indexTemplatePath = 'index.tsx';

  const fileTemplateFinalPath = path.join(
    __dirname.replace('lib', 'templates'),
    fileTemplatePath
  );
  const fileTemplateContent = readFileSync(
    fileTemplateFinalPath,
    'utf-8'
  ).replaceAll('COMPONENT_NAME', componentName);

  console.log({
    componentName,
    options,
    fileExtension,
    indexExtension,
    fileTemplatePath,
    indexTemplatePath,
    fileTemplateContent,
  });
};

initCommand();
