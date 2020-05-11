'use strict';

module.exports = {
  extends: ['ash-nazg/sauron'],
  parserOptions: {
    sourceType: 'module'
  },
  plugins: [],
  settings: {
    polyfills: [
      'fetch',
      'Object.assign',
      'Object.entries',
      'Promise',
      'URL'
    ]
  },
  env: {
    node: false,
    browser: true
  },
  overrides: [{
    files: '.eslintrc.js',
    extends: ['plugin:node/recommended-script'],
    rules: {
      'import/no-commonjs': 0
    }
  }, {
    files: '*.md',
    globals: {
      assert: false,
      SharedStorage: false
    },
    rules: {
      'import/unambiguous': 0
    }
  }],
  rules: {
    // Disable for now
    'jsdoc/require-jsdoc': 0
  }
};
