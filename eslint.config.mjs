import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ['**/*.{js,mjs,cjs,ts}']
	},
	{
		languageOptions: { globals: globals.node }
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		ignores: [
			'dist/**',
			'srcs/commands/iddqd/serv.js',
			'srcs/commands/iddqd/bundle.jsdos',
			'srcs/commands/iddqd/index.html',
			'srcs/commands/iddqd/js-dos'
		],
		rules: {
			'@typescript-eslint/explicit-module-boundary-types': ['error'],
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-inferrable-types': [
				'error',
				{
					ignoreParameters: true
				}
			],
		
			indent: ['error', 'tab'],
			'linebreak-style': ['error', 'unix'],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
		
			'brace-style': ['error', '1tbs', { allowSingleLine: true }],
			eqeqeq: ['error', 'always'],
			curly: ['error', 'multi-or-nest'],
			'multiline-ternary': ['error', 'always'],
			'no-tabs': ['error', { allowIndentationTabs: true }]
		}
	}
];
