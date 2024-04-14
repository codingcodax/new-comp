import { existsSync } from 'fs';
import path from 'path';

import { logError } from '~/helpers/logError.ts';

export const checkIfComponentExists = (dir: string) => {
  const fullPathToComponentDir = path.resolve(dir);

  if (existsSync(fullPathToComponentDir)) {
    logError(
      `Looks like this component already exists! There's already a component at ${dir}. \nPlease delete this directory and try again.`
    );
    process.exit(0);
  }
};
