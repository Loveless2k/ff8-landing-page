// ABOUTME: ESLint configuration for Final Fantasy VIII Landing Page
// ABOUTME: Configures linting rules for TypeScript and Astro files with strict type checking
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  // Astro files
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: eslintPluginAstro.parser,
      parserOptions: {
        parser: tsparser,
        extraFileExtensions: ['.astro'],
      },
    },
  },
  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  // Ignore patterns
  {
    ignores: ['dist/', 'node_modules/', '.astro/', 'package-lock.json'],
  },
];
