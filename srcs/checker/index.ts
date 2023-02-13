import { readdirSync, readFileSync, statSync } from 'fs';
import { basename, extname, resolve } from 'path';
import error from 'modules/error';
import keywords, { definition } from './keywords';

class parser {
	private forbiddenKeywords: string[];
	private step: boolean | [ boolean, boolean ];
	private blob: any | undefined;
	private errors: any[];
	private predefinedKeywords: { keyword: string }[];
	private informations: {
		func: {
			declared: {
				file: string;
				index: number;
				declaration: string;
				isConst: boolean;
			}[],
			using: any[]
		},
		keywords: { keyword: string }[],
		typedefs: any[],
		comments: { start: number; end: number }[]
	};

	constructor(
		step: boolean | [ boolean, boolean ],
		autorizedFunctions: string[] = [],
		forbiddenKeywords: string[] = []
	) {
		this.forbiddenKeywords = Array.from(forbiddenKeywords);
		this.step = step;
		this.blob = undefined;
		this.errors = [];
		this.predefinedKeywords = [];
		this.informations = {
			func: {
				declared: Array.from(autorizedFunctions, (el, i) => ({
					file: '',
					index: (i + 1) * -1,
					declaration: el,
					isConst: false,
				})),
				using: [],
			},
			keywords: [],
			typedefs: [],
			comments: [],
		};
	}

	parse(pathToFile: string) {
		const info = {
			base: basename(pathToFile),
			ext: extname(pathToFile),
		};
		const define = keywords(info.ext);
		if (Object.keys(define).length) {
			this.blob = readFileSync(pathToFile, { encoding: 'utf-8' });
			this.informations.comments = Array.from(
				this.blob.matchAll(RegExp(define.regex.comment[0], define.regex.comment[1])),
				(el: any) => ({ start: el.index, end: el.index + el[0].length }),
			);
			if (!this.predefinedKeywords.length)
				this.predefinedKeywords = Array.from(define.keywords, (el) => ({ keyword: el }));
			this.informations.keywords = this.informations.keywords.concat(
				this.get_keywords(define, pathToFile) as any[]
			);
			this.informations.func.declared = this.informations.func.declared.concat(
				this.get_declared(define, pathToFile) as any[]
			);
			if (Object.prototype.hasOwnProperty.call(define.regex, 'typedef')) {
				this.informations.typedefs = this.informations.typedefs.concat(
					this.get_typedef(define, pathToFile)
				);
			}
			this.informations.func.using = this.informations.func.using.concat(
				this.get_using(define, pathToFile)
			);
		}
	}

	private is_exist(array: any[], key: string, compare: string) {
		if (array.length < 1)
			return false;
		for (const object of array) {
			if (compare.indexOf(object[key]) !== -1)
				return true;
		}
		return false;
	}

	private generate_keywords(list: string[], justList = false) {
		let stringRegex = (justList === false)
			? '\\s(?<keyword>'
			: '';
		for (const el of list)
			stringRegex += `${el}|`;
		stringRegex = stringRegex.slice(0, stringRegex.length - 1);
		stringRegex += (justList === false)
			? ')\\s'
			: '';
		return stringRegex;
	}

	private get_keywords(define: definition, pathToFile: string) {
		return Array.from(
			this.blob.matchAll(RegExp(this.generate_keywords(define.keywords), 'gm')),
			(m: { index: number, groups: { keyword: string } }) => (
				{
					file: pathToFile,
					index: m.index,
					keyword: (m.groups.keyword)
						? m.groups.keyword.trim()
						: null,
				}
			),
		).filter((el: any) => {
			if (el.keyword && el.keyword.length > 0
				&& !this.is_in_comment(el.start, el.end))
				return true;
			return false;
		});
	}

	private get_declared(define: any, pathToFile: string) {
		return Array.from(
			this.blob.matchAll(RegExp(define.regex.declar[0], define.regex.declar[1])),
			(m: { index: number, groups: { declaration: string, is_const: boolean } }) => (
				{
					file: pathToFile,
					index: m.index,
					declaration: (m.groups.declaration)
						? m.groups.declaration.trim()
						: null,
					isConst: !!(m.groups.is_const),
				}
			),
		).filter((el: { file: string, index: number, declaration: string | null, isConst: boolean }) => {
			if (el.declaration && el.declaration.length > 0
				&& !this.is_exist(this.predefinedKeywords, 'keyword', el.declaration)
				&& !this.is_in_comment(el.index, el.index + el.declaration.length))
				return true;
			return false;
		});
	}

	private get_typedef(define: any, pathToFile: string) {
		return Array.from(
			this.blob.matchAll(RegExp(define.regex.typedef[0], define.regex.typedef[1])),
			(m: { index: number, groups: { typedef: string } }) => (
				{
					file: pathToFile,
					index: m.index,
					typedef: (m.groups.typedef)
						? m.groups.typedef.trim()
						: null,
				}
			),
		).filter((el: { file: string, index: number, typedef: string | null }) => {
			if (el.typedef && el.typedef.length > 0
				&& !this.is_in_comment(el.index, el.index + el.typedef.length))
				return true;
			return false;
		});
	}

	private get_using(define: any, pathToFile: string) {
		const list = `${this.generate_keywords(define.keywords, true)}|${this.generate_keywords(define.arithmetic, true)}`;
		return Array.from(
			this.blob.matchAll(
				RegExp(define.regex.using[0].replace('%KEYWORDS%', list), define.regex.using[1]),
			),
			(m: { file: string, index: number, groups: { function: string } }) => (
				{
					file: pathToFile,
					index: m.index,
					using: (m.groups.function)
						? m.groups.function.trim()
						: null,
				}
			),
		).filter((el: any) => {
			if (el.using.length > 0
				&& (!this.is_exist(this.informations.keywords, 'keyword', el.using))
				&& (!this.is_exist(this.informations.typedefs, 'typedef', el.using))
				&& !this.is_in_comment(el.index, el.index + el.using.length))
				return true;
			return false;
		});
	}

	private is_in_comment(start: number, end: number) {
		for (const comment of this.informations.comments) {
			if (start > comment.start && end < comment.end)
				return true;
		}
		return false;
	}

	get_forbidden_functions() {
		if (!Array.isArray(this.step)) {
			for (const funct of this.informations.func.using) {
				if (!this.is_exist(this.informations.func.declared, 'declaration', funct.using))
					this.errors.push(funct);
			}

			if (this.forbiddenKeywords.length > 0) {
				for (const key of this.informations.keywords) {
					if (this.forbiddenKeywords.indexOf(key.keyword) !== -1)
						this.errors.push(key);
				}
			}
		} else {
			if (this.step[0] === true) {
				for (const funct of this.informations.func.using) {
					if (!this.is_exist(this.informations.func.declared, 'declaration', funct.using))
						this.errors.push(funct);
				}
			}

			if (this.step[1] === true && this.forbiddenKeywords.length > 0) {
				for (const key of this.informations.keywords) {
					if (this.forbiddenKeywords.indexOf(key.keyword) !== -1)
						this.errors.push(key);
				}
			}
		}
		return this.errors;
	}
}

export default class {
	private list: (string | string[])[][];
	private parser: parser;

	/**
	 * The checker verifies if the code written by the user respects the set rules
	 * @param {string} directory path of the folder where these files are located
	 * @param {boolean|boolean[]} step Defined how checker work, if `true`, functions and keywords is checked; if array, [{true|false}functions, {true|false}keywords] is checked
	 * @param {string[]} autorizedFunctions list of external functions allowed in the project. By default no external functions are allowed. Pass an empty array to have the default feature.
	 * @param {string[]} forbiddenKeywords list of forbidden keywords in the project (like continue, if, switch, ...). By default every keywords are allowed. Pass an empty array to have the default feature.
	 */
	constructor(
		directory: string,
		step: boolean | [ boolean, boolean ],
		autorizedFunctions: string[] = [],
		forbiddenKeywords: string[] = []
	) {
		const checkArgs = {
			directory: (typeof directory !== 'string')
				? '(`directory` is not a String)'
				: '',
			functions: (!Array.isArray(autorizedFunctions))
				? '(`autorizedFunctions` is not a Array)'
				: '',
			forbiddenKeywords: (!Array.isArray(forbiddenKeywords))
				? '(`forbiddenKeywords` is not a Array)'
				: '',
		};
		if (checkArgs.directory.length || checkArgs.functions.length || checkArgs.forbiddenKeywords.length)
			error(40, { data: `${checkArgs.directory}${checkArgs.functions}${checkArgs.forbiddenKeywords}` });
		this.list = this.tree_files(directory) as (string | string[])[][];
		this.parser = new parser(step, autorizedFunctions, forbiddenKeywords);
	}

	private tree_files(directory: string): unknown {
		const files = readdirSync(directory).map((file) => {
			const filePath = resolve(directory, file);
			return (statSync(filePath).isDirectory())
				? this.tree_files(filePath)
				: filePath;
		});
		return files.filter((file: any) => file.length);
	}

	private navigate(list: any) {
		for (const file of list) {
			if (Array.isArray(file))
				this.navigate(file);
			else
				this.parser.parse(file);
		}
	}

	/**
	 * Check file(s)
	 * @returns Array(s) contains errors, or empty array
	 */
	check(): string[] {
		this.navigate(this.list);
		return [];
		//return Array.from(this.parser.get_forbidden_functions());
	}
}