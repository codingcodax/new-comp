const requireOptional = (filePath: string) => {
  try {
    return require(filePath);
  } catch (e) {
    // @ts-ignore
    if (e.code !== 'MODULE_NOT_FOUND') throw e;
  }
};

export default requireOptional;
