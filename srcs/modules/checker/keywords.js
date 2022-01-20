/* eslint-disable no-useless-escape */
const def = {
	c: {
		extensions: ['c', 'h'],
		keywords: ['auto', 'break', 'case', 'char', 'const', 'continue', 'default',
			'do', 'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'int',
			'long', 'register', 'return', 'short', 'signed', 'sizeof', 'static', 'struct',
			'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while'],
		regex: {
			declar: /^[\t ]*[a-zA-Z0-9_\- ]+[\s*]+([a-zA-Z0-9_\-]*)(\s*)?\(/gm,
			using: /([a-zA-Z0-9_\-]+)[\s*]*?\(/gm,
			simple_comment: /(\/\/.*)$/gm,
			double_comment: /(\/\*.*\*\/)/gms,
		},
	},
	cpp: {
		extensions: ['cpp', 'hpp'],
		keywords: ['asm', 'else', 'new', 'this', 'auto', 'enum', 'operator', 'throw',
			'bool', 'explicit', 'private', 'true', 'break', 'export', 'protected', 'try',
			'case', 'extern', 'public', 'typedef', 'catch', 'false', 'register', 'typeid',
			'char', 'float', 'reinterpret_cast', 'typename', 'class', 'for', 'return',
			'union', 'const', 'friend', 'short', 'unsigned', 'const_cast', 'goto', 'signed',
			'using', 'continue', 'if', 'sizeof', 'virtual', 'default', 'inline', 'static',
			'void', 'delete', 'int', 'static_cast', 'volatile', 'do', 'long', 'struct',
			'wchar_t', 'double', 'mutable', 'switch', 'while', 'dynamic_cast', 'namespace',
			'template', 'and', 'bitor', 'not_eq', 'xor', 'and_eq', 'compl', 'or', 'xor_eq',
			'bitand', 'not', 'or_eq'],
		regex: {
			declar: /^[\t ]*[a-zA-Z0-9_\- ]+[\s*&]+([a-zA-Z0-9_\-]*)(\s*)?\(/gm,
			using: /([a-zA-Z0-9_\-]+)[\s*&]*?\(/gm,
			simple_comment: /(\/\/.*)$/gm,
			double_comment: /(\/\*.*\*\/)/gms,
		},
	},
};

class keywords
{
	static get(fileExtension)
	{
		if (fileExtension[0] === '.')
			fileExtension = fileExtension.slice(1); // eslint-disable-line no-param-reassign
		for (const i in def)
			if (def[i].extensions.indexOf(fileExtension) !== -1)
				return def[i];
		return {};
	}
}

// export default keywords
module.exports = keywords;
