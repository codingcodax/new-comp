import prettier from 'prettier';

const buildPrettifier = () => {
  let config = prettier.resolveConfig.sync(process.cwd()) || {
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5',
  };

  config.parser = config.parser || 'babel';

  return (text: string) => prettier.format(text, config);
};

export default buildPrettifier;
