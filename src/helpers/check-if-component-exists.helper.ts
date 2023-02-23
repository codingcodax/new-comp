import path from 'path';
import { existsSync } from 'fs';
import logError from './log-error.helper';

const checkIfComponentExists = (dir: string) => {
  const fullPathToComponentDir = path.resolve(dir);

  if (existsSync(fullPathToComponentDir)) {
    logError(
      `Looks like this component already exists! There's already a component at ${dir}. \nPlease delete this directory and try again.`
    );
    process.exit(0);
  }
};

export default checkIfComponentExists;
