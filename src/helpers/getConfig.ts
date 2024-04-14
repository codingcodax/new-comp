import { homedir } from 'os';

import { requireOptional } from '~/utils/requireOptional.ts';

type Config = {
  lang: string;
  type: string;
  ui: string;
  dir: string;
};

export const getConfig = () => {
  const home = homedir();
  const currentPath = process.cwd();

  const globalOverrides: Config = requireOptional(`/${home}/nw.config.json`);
  const localOverrides: Config = requireOptional(
    `/${currentPath}/nw.config.json`
  );

  return Object.assign({}, globalOverrides, localOverrides);
};
