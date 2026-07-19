import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import playwright from 'eslint-plugin-playwright'
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
  '@typescript-eslint/no-floating-promises': 'error',
}

export default tseslint.config(
  { ignores: ['node_modules/', 'test-results/', 'playwright-report/', 'blob-report/'] },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js', '*.cjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: { ...sharedJavaScriptRules, ...sharedTypeScriptRules },
  },
  {
    files: ['tests/**/*.ts'],
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/expect-expect': 'off',
    },
  },
  eslintConfigPrettier,
)
