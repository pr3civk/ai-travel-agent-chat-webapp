import antfu from '@antfu/eslint-config';
import nextPlugin from '@next/eslint-plugin-next';
import jestDom from 'eslint-plugin-jest-dom';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default antfu(
  {
    react: true,
    typescript: true,

    // Configuration preferences
    lessOpinionated: true,
    isInEditor: false,

    // Code style
    stylistic: {
      semi: true,
    },

    // Format settings
    formatters: {
      css: true,
    },

    // Ignored paths
    ignores: ['migrations/**/*'],
  },
  // --- Next.js Specific Rules ---
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  // --- Accessibility Rules ---
  jsxA11y.flatConfigs.recommended,
  // --- Testing Rules ---
  {
    files: ['**/*.test.ts?(x)'],
    ...jestDom.configs['flat/recommended'],
  },
  // --- E2E Testing Rules ---
  {
    rules: {
      'antfu/no-top-level-await': 'off', // Allow top-level await
      'style/brace-style': ['error', '1tbs'], // Use the default brace style
      'ts/consistent-type-definitions': ['error', 'type'], // Use `type` instead of `interface`
      'react/prefer-destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
      'node/prefer-global/process': 'off', // Allow using `process.env`
      'test/prefer-lowercase-title': 'off', // Allow using uppercase titles in test titles
      'react/no-nested-components': 'off', // Allow nesting children in React components
      'react/no-unstable-nested-components': 'off', // Allow nesting children in React components
      'react/no-nested-lazy-component-declarations': 'off', // Allow nested lazy component declarations
      'react/no-nested-component-definitions': 'off', // Allow nested component definitions
      'style/arrow-parens': 'off', // Allow arrow parens
      'style/operator-linebreak': 'off', // Allow operator linebreak
      'style/indent-binary-ops': 'off', // Allow indent binary ops
      'style/multiline-ternary': 'off', // Allow multiline ternary
      'style/jsx-wrap-multilines': 'off', // Allow jsx wrap multilines
      'style/jsx-one-expression-per-line': 'off', // Allow jsx one expression per line
      'style/jsx-curly-newline': 'off', // Allow jsx curly newline
      'react/no-array-index-key': 'warn', // Allow array index key
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
      'react-refresh/only-export-components': 'off',
      'react/no-unstable-context-value': 'off',
      'ts/no-use-before-define': 'off',
      'no-console': 'off',
      'unused-imports/no-unused-vars': 'warn',
    },
  },
);
