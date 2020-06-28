'use strict';

module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },

	plugins: ['@typescript-eslint'],
	extends: ['@fkm/eslint-config'],

	env: {},

  rules: {
		'max-len': ['off'],
  },
};
