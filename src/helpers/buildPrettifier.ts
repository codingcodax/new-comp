import prettier from '@prettier/sync';

export const buildPrettifier = () => {
  const config = prettier.resolveConfig(process.cwd()) || {
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5',
  };

  config.parser = config.parser || 'babel';

  return (text: string) => prettier.format(text, config);
};
