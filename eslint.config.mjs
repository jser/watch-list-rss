import js from '@eslint/js';
import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals.node,
        ...globals.browser,
      },
      parser: typescriptEslintParser,
    },
    plugins: {
      'js': js,
      '@typescript-eslint': typescriptEslint,
      'import': importPlugin,
      'prettier': eslintPluginPrettier,
    },
    rules: {
      ...js.configs.recommended.rules,

      ...typescriptEslint.configs.recommended.rules,
      ...typescriptEslint.configs.strict.rules,
      ...typescriptEslint.configs.stylistic.rules,
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',

      ...importPlugin.configs.typescript.rules,
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',

      ...eslintPluginPrettierRecommended.rules,
      'prettier/prettier': 'warn',
    },
  },

  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
