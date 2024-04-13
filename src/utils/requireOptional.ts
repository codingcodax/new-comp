
export const requireOptional = (filePath: string) => {
  try {
    return require(filePath);
  } catch (e) {
    // @ts-expect-error e.code is of type 'unknown'.
    if (e.code !== 'MODULE_NOT_FOUND') throw e;
  }
};
