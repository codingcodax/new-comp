import { homedir } from 'os';

import { requireOptional } from '~/utils/requireOptional';

type Config = {
  lang: string;
  type: string;
  ui: string;
  dir: string;
};

export const getConfig = () => {
  const home = homedir();
  const currentPath = process.cwd();

  const defaults: Config = {
    lang: 'ts',
    type: 'function',
    ui: 'vanilla',
    dir: 'src/components',
  };

  const globalOverrides: Config = requireOptional(`/${home}/nw.config.json`);
  const localOverrides: Config = requireOptional(
    `/${currentPath}/nw.config.json`
  );

  return Object.assign({}, defaults, globalOverrides, localOverrides);
};
