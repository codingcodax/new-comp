import chalk from 'chalk';

const logError = (error: string) => {
  console.info('\n');
  console.info(chalk.bold.hex('#e5484d')('Error creating component.'));
  console.info(chalk.hex('#e5484d')(error));
};

export default logError;
