module.exports = {
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  arrowParens: 'avoid',
  printWidth: 100,
  overrides: [
    {
      files: ['*.js', '**/*.js', '*.cjs', '**/*.cjs', '*.mjs', '**/*.mjs', '*.ts', '**/*.ts'],
      options: {
        plugins: ['@ianvs/prettier-plugin-sort-imports'],
        importOrder: ['<BUILTIN_MODULES>', '<THIRD_PARTY_MODULES>', '^[.]'],
        importOrderParserPlugins: ['typescript', 'decorators'],
      },
    },
  ],
}
