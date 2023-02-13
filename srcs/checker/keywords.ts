export interface definition {
	extensions: string[],
	keywords: string[],
	arithmetic: string[],
	regex: {
		declar: [ string, string ],
		using: [ string, string ],
		comment: [ string, string ],
	}
}

export const def = {
	c: {
		extensions: ['c', 'h'],
		keywords: ['auto', 'break', 'case', 'char', 'const', 'continue', 'default',
			'do', 'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'int',
			'long', 'register', 'return', 'short', 'signed', 'sizeof', 'static', 'struct',
			'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while'],
		arithmetic: ['\\+', '\\-', '\\*', '\\/', '\\%', '\\+\\+', '\\-\\-'],
		regex: {
			declar: ['(?<=\\w\\s+)(?<declaration>[\\w<>:_\\[\\]~&=+\\/!-]+)[\\s ]*\\(.*\\)\\s*{', 'gm'],
			using: ['(?<function>[\\w:_~&]+)(?<!%KEYWORDS%)[\\s ]*\\(', 'gm'],
			comment: ['(\\/\\*([^*]|(\\*+[^*/]))*\\*+\\/)|(\\/\\/.*)', 'gm'],
		},
	},
	cpp: {
		extensions: ['cpp', 'hpp'],
		keywords: ['and', 'and_eq', 'asm', 'auto', 'bitand', 'bitor', 'bool',
			'break', 'case', 'catch', 'char', 'class', 'compl', 'const', 'const_cast',
			'continue', 'default', 'delete', 'do', 'double', 'dynamic_cast', 'else',
			'enum', 'explicit', 'export', 'extern', 'false', 'float', 'for', 'friend',
			'goto', 'if', 'inline', 'int', 'long', 'mutable', 'namespace', 'new',
			'not', 'not_eq', 'operator', 'or', 'or_eq', 'private', 'protected',
			'public', 'register', 'reinterpret_cast', 'return', 'short', 'signed',
			'sizeof', 'static', 'static_cast', 'struct', 'switch', 'template',
			'this', 'throw', 'true', 'try', 'typedef', 'typeid', 'typename',
			'union', 'unsigned', 'using', 'virtual', 'void', 'volatile',
			'wchar_t', 'while', 'xor', 'xor_eq'],
		arithmetic: ['\\+', '\\-', '\\*', '\\/', '\\%', '\\+\\+', '\\-\\-'],
		regex: {
			declar: ['(?<=\\w\\s+)(?<declaration>[\\w<>:_\\[\\]~&=+\\/!-]+)[\\s ]*\\(.*\\)\\s*(?<is_const>const\\s*)?\\s*{', 'gm'],
			using: ['(?<function>[\\w:_~&]+)(?<!%KEYWORDS%)[\\s ]*\\(', 'gm'],
			typedef: ['typedef\\s+[\\w:<> \\t,]+\\s+(?<typedef>[\\w*&-]*);?', 'gm'],
			comment: ['(\\/\\*([^*]|(\\*+[^*/]))*\\*+\\/)|(\\/\\/.*)', 'gm'],
		},
	},
} as { [key: string]: definition };

export default (fileExtension: string): definition => {
	let temp = fileExtension;
	if (temp === '.')
		temp = temp.slice(1);
	for (const i in def) {
		if (def[i].extensions.indexOf(temp) !== -1)
			return def[i];
	}
	return {} as definition;
};
