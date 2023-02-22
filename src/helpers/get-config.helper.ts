import { homedir } from 'os';
import { requireOptional } from '../utils';

const getConfig = () => {
  const home = homedir();
  const currentPath = process.cwd();

  const defaults = {
    lang: 'ts',
    type: 'function',
    ui: 'vanilla',
    dir: 'src/components',
  };

  const globalOverrides = requireOptional(`/${home}/nw.config.json`);
  const localOverrides = requireOptional(`/${currentPath}/nw.config.json`);

  return Object.assign({}, defaults, globalOverrides, localOverrides);
};

export default getConfig;
