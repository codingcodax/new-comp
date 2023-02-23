#!/usr/bin/env node
import { mkdirSync, writeFileSync, readFileSync } from 'fs';
import path from 'path';
import { Command, Option } from 'commander';

import { version } from '../package.json';
import {
  buildPrettifier,
  checkIfComponentExists,
  getConfig,
  logConclusion,
  logIntro,
} from './helpers';

const program = new Command();
const config = getConfig();
const prettify = buildPrettifier();

const init = () => {
  program
    .name('new-component')
    .summary('Create react components.')
    .description('CLI utility for create react components the way you love.')
    .version(version, '-v, --version', 'Output the version number.')
    .argument('<componentName>', 'Name of the component you want create')
    .helpOption('-h, --help', 'Display help for command')
    // .addOption(
    //   new Option('-i, --interactive', 'Use CLI to configure.').conflicts([
    //     'lang',
    //     'type',
    //     'component',
    //     'dir',
    //   ])
    // )
    .addOption(
      new Option('-l, --lang <language>', 'Which language to use')
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
    )
    .parse(process.argv);

  const [componentName] = program.args;

  const options = program.opts();

  // Files extension.
  const fileExtension = options.lang === 'js' ? 'js' : 'tsx';
  const indexExtension = options.lang === 'js' ? 'js' : 'ts';

  // Find the path to the selected template files.
  const fileTemplatePath = `templates/${options.type}-${options.ui}.txt`;
  const indexTemplatePath = 'templates/index.txt';

  const fileTemplateContent = readFileSync(
    path.join(__dirname, fileTemplatePath),
    'utf-8'
  ).replace(/COMPONENT_NAME/g, componentName);
  const indexTemplateContent = readFileSync(
    path.join(__dirname, indexTemplatePath),
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

init();
