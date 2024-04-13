/** @type {import('prettier').Config} */
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
