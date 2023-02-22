import path from 'path';
import { existsSync, mkdirSync } from 'fs';

const createParentDirIfNecessary = (dir: string) => {
  const fullPathToParentDir = path.resolve(dir);

  if (!existsSync(fullPathToParentDir)) mkdirSync(dir);
};

export default createParentDirIfNecessary;
