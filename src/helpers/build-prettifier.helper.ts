import prettier from 'prettier';

const buildPrettifier = (text: string) => {
  let config = prettier.resolveConfig.sync(process.cwd());

  config = config || {
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5',
  };

  config.parser = config.parser || 'babel';

  return prettier.format(text, config);
};

export default buildPrettifier;
