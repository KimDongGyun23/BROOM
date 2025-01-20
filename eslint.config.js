import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
    settings: {
      'import/resolver': {
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          tsconfigRootDir: '__dirname',
          project: ['./tsconfig.json', './tsconfig.node.json'],
        },
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      react: { version: 'detect' },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'unused-imports': eslintPluginUnusedImports,
      'simple-import-sort': eslintPluginSimpleImportSort,
      import: eslintPluginImport,
      'jsx-a11y': eslintPluginJsxA11y,
      prettier: eslintPluginPrettier,
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'no-duplicate-imports': 'off',
      'import/newline-after-import': 'warn',
      'import/no-named-as-default': 'off',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^@/(.*)'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
]
