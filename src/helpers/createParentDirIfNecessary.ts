import { existsSync, mkdirSync } from 'fs';
import path from 'path';

export const createParentDirIfNecessary = (dir: string) => {
  const fullPathToParentDir = path.resolve(dir);

  if (!existsSync(fullPathToParentDir)) mkdirSync(dir);
};
