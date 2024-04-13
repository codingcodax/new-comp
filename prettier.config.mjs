/** @type {import('prettier').Config  & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  plugins: [
    '@ianvs/prettier-plugin-sort-imports'
  ],
  importOrder: [
    '<TYPES>',
    '<THIRD_PARTY_MODULES>',
    '',
    '<TYPES>^[.|..|~]',
    '^~/',
    '',
    '^[../]',
    '^[./]',
  ]
}

export default config;
