import chalk from 'chalk';

const colors = {
  react: '#61dafb',
  js: '#f7df1e',
  ts: '#3178c6',
  chakra: '#319795',
  mui: '#007fff',
};

const langColor = (lang: string) => (lang === 'ts' ? colors.ts : colors.js);
const uiColor = (ui: string) => {
  if (ui === 'chakra') return colors.chakra;
  if (ui === 'mui') return colors.mui;

  return colors.js;
};

const fullLang = (lang: string) =>
  lang === 'js' ? 'JavaScript' : 'TypeScript';

export const logIntro = ({ name, lang, type, ui, dir }: { [key: string]: string }) => {
  const nameString = chalk.bold.hex(colors.react)(name);
  const langString = chalk.bold.hex(langColor(lang))(fullLang(lang));
  const typeString = chalk.bold.hex('#6e56cf')(type);
  const uiString = chalk.bold.hex(uiColor(ui))(ui);
  const dirString = chalk.bold.hex('#6e56cf')(dir);

  console.info(`✨ Creating the ${nameString} component ✨`);
  console.info('\n');

  console.info(`Language: ${langString}`);
  console.info(`Type: ${typeString}`);
  console.info(`UI Library: ${uiString}`);
  console.info(`Directory: ${dirString}`);
};
