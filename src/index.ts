#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Command, Option } from 'commander';

import { getConfig } from '~/helpers/getConfig';

import packageJson from '../package.json';
import { buildPrettifier } from './helpers/buildPrettifier';
import { checkIfComponentExists } from './helpers/checkIfComponentExists';
import { logConclusion } from './helpers/logConclusion';
import { logIntro } from './helpers/logIntro';

const config = getConfig();
const program = new Command();
const prettify = buildPrettifier();

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
  const indexTemplatePath = 'index.txt';

  const fileTemplateFinalPath = path.join(
    __dirname.replace('lib', 'templates'),
    fileTemplatePath
  );
  const indexTemplateFinalPath = path.join(
    __dirname.replace('lib', 'templates'),
    indexTemplatePath
  );
  const fileTemplateContent = readFileSync(
    fileTemplateFinalPath,
    'utf-8'
  ).replaceAll('COMPONENT_NAME', componentName);
  const indexTemplateContent = readFileSync(
    indexTemplateFinalPath,
    'utf-8'
  ).replace('COMPONENT_NAME', componentName);

  // Get all of our file paths worked out, for the user's project.
  const componentDir = `${options.dir}/${componentName}`;
  const filePath = `${componentDir}/${componentName}.${fileExtension}`;
  const indexPath = `${componentDir}/index.${indexExtension}`;

  logIntro({
    name: componentName,
    lang: options.lang,
    type: options.type,
    ui: options.ui,
    dir: componentDir,
  });

  // Check if the component has already been created.
  checkIfComponentExists(componentDir);

  // Start by creating the directory that our component lives in.
  mkdirSync(componentDir, { recursive: true });

  // Create component and index files coping content from templates.
  writeFileSync(filePath, prettify(fileTemplateContent), 'utf-8');
  writeFileSync(indexPath, prettify(indexTemplateContent), 'utf-8');

  logConclusion();
};

initCommand();
