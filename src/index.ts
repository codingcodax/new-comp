#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import * as p from '@clack/prompts';
import { Command, Option } from 'commander';

import { buildPrettifier } from '~/helpers/buildPrettifier.ts';
import { checkIfComponentExists } from '~/helpers/checkIfComponentExists.ts';
import { getConfig } from '~/helpers/getConfig.ts';
import { logConclusion } from '~/helpers/logConclusion.ts';
import { logIntro } from '~/helpers/logIntro.ts';

import packageJson from '../package.json';

const config = getConfig();
const program = new Command();
const prettify = buildPrettifier();

const initCommand = async () => {
  program
    .name(packageJson.name)
    .summary('Create react components')
    .description(packageJson.description)
    .version(packageJson.version, '-v, --version', 'Display version number')
    .helpOption('-h, --help', 'Display help for command')
    .argument('[componentName]', 'Name of the component you want to create')
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

  const project = await p.group(
    {
      ...(!componentName && {
        name: () =>
          p.text({
            message: 'What is the name of your component?',
            placeholder: 'MyComponent',
            validate: (value) =>
              value.length > 0 ? '' : 'Please enter a name',
          }),
      }),
      ...(!options.lang && {
        lang: () =>
          p.select({
            message: 'Which language would you like to use?',
            initialValue: 'ts',
            options: [
              { value: 'ts', label: 'TypeScript' },
              { value: 'js', label: 'JavaScript' },
            ],
          }),
      }),
      ...(!options.type && {
        type: () =>
          p.select({
            message: 'What type of component would you like to create?',
            initialValue: 'function',
            options: [
              { value: 'function', label: 'Function' },
              { value: 'arrow', label: 'Arrow Function' },
              { value: 'class', label: 'Class Component' },
            ],
          }),
      }),
      ...(!options.ui && {
        ui: () =>
          p.select({
            message: 'Choose your favorite component library',
            initialValue: 'vanilla',
            options: [
              { value: 'vanilla', label: 'Vanilla JS' },
              { value: 'chakra', label: 'Chakra UI' },
              { value: 'mui', label: 'Material UI' },
            ],
          }),
      }),
      ...(!options.dir && {
        dir: () =>
          p.text({
            message: 'Where would you like to create your component?',
            placeholder: 'components',
            defaultValue: 'src/components',
            validate: (value) =>
              value.length > 0 ? '' : 'Please enter a directory',
          }),
      }),
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled');
        process.exit(0);
      },
    }
  );

  const fileExtension = (project ?? options).lang === 'js' ? 'js' : 'tsx';
  const indexExtension = (project ?? options).lang === 'js' ? 'js' : 'ts';
  const fileTemplatePath = `${(project ?? options).type}/${(project ?? options).ui}.tsx`;
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
  ).replaceAll('COMPONENT_NAME', project.name ?? componentName);
  const indexTemplateContent = readFileSync(
    indexTemplateFinalPath,
    'utf-8'
  ).replace('COMPONENT_NAME', project.name ?? componentName);

  // Get all of our file paths worked out, for the user's project.
  const componentDir = `${(project ?? options).dir}/${project.name ?? componentName}`;
  const filePath = `${componentDir}/${project.name ?? componentName}.${fileExtension}`;
  const indexPath = `${componentDir}/index.${indexExtension}`;

  logIntro({
    name: project.name ?? componentName,
    lang: (project ?? options).lang as string,
    type: (project ?? options).type as string,
    ui: (project ?? options).ui as string,
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
