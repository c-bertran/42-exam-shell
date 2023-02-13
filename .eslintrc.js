module.exports = {
	'env': {
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module'
	},
	'plugins': [
		'@typescript-eslint'
	],
	rules: {
		'@typescript-eslint/explicit-module-boundary-types': 'off',
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
	},
	ignorePatterns: ['dist', 'srcs/commands/iddqd/bundle.jsdos', 'srcs/commands/iddqd/index.html' ,'srcs/commands/iddqd/js-dos'],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				'@typescript-eslint/explicit-module-boundary-types': ['error']
			}
		}
	]
};
