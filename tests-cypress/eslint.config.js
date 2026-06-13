import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginChaiFriendly from 'eslint-plugin-chai-friendly'
import mochaPlugin from 'eslint-plugin-mocha'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const sharedJavaScriptRules = {
  'no-debugger': 'warn',
  'prefer-arrow-callback': 'error',
  'no-param-reassign': 'error',
  eqeqeq: ['error', 'always'],
}

const sharedTypeScriptRules = {
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }],
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unsafe-argument': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/no-unsafe-return': 'off',
  '@typescript-eslint/restrict-template-expressions': 'off',
  '@typescript-eslint/no-misused-promises': 'off',
  '@typescript-eslint/unbound-method': 'off',
  '@typescript-eslint/require-await': 'off',
}

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'cypress/downloads/**',
      'cypress/reports/**',
      'cypress/screenshots/**',
      'cypress/videos/**',
      'allure-results/**',
      'allure-report/**',
    ],
  },
  {
    name: 'node-config-files',
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: { globals: { ...globals.node } },
    extends: [js.configs.recommended],
    rules: sharedJavaScriptRules,
  },
  {
    name: 'typescript-foundations',
    files: ['cypress.config.ts', 'cypress/**/*.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: { ...sharedJavaScriptRules, ...sharedTypeScriptRules },
  },
  {
    name: 'cypress-tests',
    files: ['cypress/e2e/**/*.ts', 'cypress/support/**/*.ts'],
    plugins: { 'chai-friendly': pluginChaiFriendly, mocha: mochaPlugin },
    languageOptions: {
      globals: { ...globals.mocha, cy: 'readonly', Cypress: 'readonly', expect: 'readonly' },
    },
    rules: {
      'mocha/no-exclusive-tests': 'error',
      'mocha/no-pending-tests': 'error',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'chai-friendly/no-unused-expressions': 'error',
    },
  },
  {
    name: 'declaration-files',
    files: ['cypress/**/*.d.ts'],
    rules: { '@typescript-eslint/no-unused-vars': 'off' },
  },
  eslintConfigPrettier,
)
