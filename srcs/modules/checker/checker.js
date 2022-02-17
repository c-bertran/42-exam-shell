/* eslint-disable class-methods-use-this */
require('../fspatch');
const fs = require('fs');
const path = require('path');
const keywords = require('./keywords');

// Optional function for automatically escape special char from string
// const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

class Parser
{
	constructor(step, autorizedFunctions, forbiddenKeywords)
	{
		this.forbiddenKeywords = Array.from(forbiddenKeywords);
		this.step = step;
		this.blob = undefined;
		this.errors = [];
		this.predefinedKeywords = [];
		this.informations = {
			functions: {
				declared: Array.from(autorizedFunctions, (el, i) => ({
					file: String(''),
					index: Number((i + 1) * -1),
					declaration: String(el),
					isConst: Boolean(false),
				})),
				using: [],
			},
			keywords: [],
			typedefs: [],
			comments: [],
		};
	}

	parse(pathToFile)
	{
		const info = {
			base: path.basename(pathToFile),
			ext: path.extname(pathToFile),
		};
		const define = keywords.get(info.ext);
		if (Object.keys(define).length)
		{
			this.blob = fs.readFileSync(pathToFile, { encoding: 'utf-8' });

			this.informations.comments = Array.from(
				this.blob.matchAll(RegExp(define.regex.comment[0], define.regex.comment[1])),
				(el) => ({ start: el.index, end: el.index + el[0].length }),
			);

			if (!this.predefinedKeywords.length)
				this.predefinedKeywords = Array.from(define.keywords, (el) => ({ keyword: el }));
			this.informations.keywords = this.informations.keywords.concat(this.#get_keywords(define, pathToFile));

			this.informations.functions.declared = this.informations.functions.declared.concat(this.#get_declared(define, pathToFile));

			if (Object.prototype.hasOwnProperty.call(define.regex, 'typedef'))
				this.informations.typedefs = this.informations.typedefs.concat(this.#get_typedef(define, pathToFile));

			this.informations.functions.using = this.informations.functions.using.concat(this.#get_using(define, pathToFile));
		}
	}

	#is_exist(array, key, compare)
	{
		if (array.length < 1)
			return false;
		for (const object of array)
			if (compare.indexOf(object[key]) !== -1)
				return true;
		return false;
	}

	#generate_keywords(list, justList = false)
	{
		let stringRegex = (justList === false) ? '\\s(?<keyword>' : '';
		for (const el of list)
			stringRegex += `${el}|`;
		stringRegex = stringRegex.slice(0, stringRegex.length - 1);
		stringRegex += (justList === false) ? ')\\s' : '';
		return stringRegex;
	}

	#get_keywords(define, pathToFile)
	{
		return Array.from(
			this.blob.matchAll(RegExp(this.#generate_keywords(define.keywords), 'gm')),
			(m) => (
				{
					file: pathToFile,
					index: m.index,
					keyword: (m.groups.keyword) ? m.groups.keyword.trim() : null,
				}
			),
		).filter((el) =>
		{
			if (el.keyword.length > 0
				&& !this.#is_in_comment(el.start, el.end))
				return true;
			return false;
		});
	}

	#get_declared(define, pathToFile)
	{
		return Array.from(
			this.blob.matchAll(RegExp(define.regex.declar[0], define.regex.declar[1])),
			(m) => (
				{
					file: pathToFile,
					index: m.index,
					declaration: (m.groups.declaration) ? m.groups.declaration.trim() : null,
					isConst: !!(m.groups.is_const),
				}
			),
		).filter((el) =>
		{
			if (el.declaration.length > 0
				&& !this.#is_exist(this.predefinedKeywords, 'keyword', el.declaration)
				&& !this.#is_in_comment(el.index, el.index + el.declaration.length))
				return true;
			return false;
		});
	}

	#get_typedef(define, pathToFile)
	{
		return Array.from(
			this.blob.matchAll(RegExp(define.regex.typedef[0], define.regex.typedef[1])),
			(m) => (
				{
					file: pathToFile,
					index: m.index,
					typedef: (m.groups.typedef) ? m.groups.typedef.trim() : null,
				}
			),
		).filter((el) =>
		{
			if (el.typedef.length > 0
				&& !this.#is_in_comment(el.index, el.index + el.typedef.length))
				return true;
			return false;
		});
	}

	#get_using(define, pathToFile)
	{
		const list = `${this.#generate_keywords(define.keywords, true)}|${this.#generate_keywords(define.arithmetic, true)}`;
		return Array.from(
			this.blob.matchAll(
				RegExp(define.regex.using[0].replace('%KEYWORDS%', list), define.regex.using[1]),
			),
			(m) => (
				{
					file: pathToFile,
					index: m.index,
					using: (m.groups.function) ? m.groups.function.trim() : null,
				}
			),
		).filter((el) =>
		{
			if (el.using.length > 0
				&& (!this.#is_exist(this.informations.keywords, 'keyword', el.using))
				&& (!this.#is_exist(this.informations.typedefs, 'typedef', el.using))
				&& !this.#is_in_comment(el.index, el.index + el.using.length))
				return true;
			return false;
		});
	}

	#is_in_comment(start, end)
	{
		for (const comment of this.informations.comments)
			if (start > comment.start && end < comment.end)
				return true;
		return false;
	}

	get_forbidden_functions()
	{
		if (!Array.isArray(this.step))
		{
			for (const funct of this.informations.functions.using)
				if (!this.#is_exist(this.informations.functions.declared, 'declaration', funct.using))
					this.errors.push(funct);

			if (this.forbiddenKeywords.length > 0)
				for (const key of this.informations.keywords)
					if (this.forbiddenKeywords.indexOf(key.keyword) !== -1)
						this.errors.push(key);
		}
		else
		{
			if (this.step[0] === true)
				for (const funct of this.informations.functions.using)
					if (!this.#is_exist(this.informations.functions.declared, 'declaration', funct.using))
						this.errors.push(funct);

			if (this.step[1] === true && this.forbiddenKeywords.length > 0)
				for (const key of this.informations.keywords)
					if (this.forbiddenKeywords.indexOf(key.keyword) !== -1)
						this.errors.push(key);
		}
		return this.errors;
	}
}

class checker
{
	/**
	 * The checker verifies if the code written by the user respects the set rules
	 * @param {String} directory path of the folder where these files are located
	 * @param {Boolean|Array} step Defined how checker work, if `true`, functions and keywords is checked; if array, [{true|false}functions, {true|false}keywords] is checked
	 * @param {Array} autorizedFunctions list of external functions allowed in the project. By default no external functions are allowed. Pass an empty array to have the default feature.
	 * @param {Array} forbiddenKeywords list of forbidden keywords in the project (like continue, if, switch, ...). By default every keywords are allowed. Pass an empty array to have the default feature.
	 */
	constructor(directory, step, autorizedFunctions = [], forbiddenKeywords = [])
	{
		const checkArgs = {
			directory: (typeof directory !== 'string') ? '(`directory` is not a String)' : '',
			functions: (!Array.isArray(autorizedFunctions)) ? '(`autorizedFunctions` is not a Array)' : '',
			forbiddenKeywords: (!Array.isArray(forbiddenKeywords)) ? '(`forbiddenKeywords` is not a Array)' : '',
		};
		if (checkArgs.directory.length || checkArgs.functions.length || checkArgs.forbiddenKeywords.length)
			throw new Error(`${checkArgs.directory}${checkArgs.functions}${checkArgs.forbiddenKeywords}`);

		this.step = step;
		this.list = this.#tree_files(directory);
		this.errors = undefined;
		this.parser = new Parser(step, autorizedFunctions, forbiddenKeywords);
	}

	#tree_files(directory)
	{
		const files = fs.readdirSync(directory).map((file) =>
		{
			const filePath = path.join(directory, file);
			return (fs.statSync(filePath).isDirectory()) ? this.#tree_files(filePath) : filePath;
		});
		return files.filter((file) => file.length);
	}

	#navigate(list)
	{
		for (const file of list)
			if (Array.isArray(file))
				this.#navigate(file);
			else
				this.parser.parse(file);
	}

	/**
	 * Check file(s)
	 * @returns Array(s) contains errors, or empty array
	 */
	check()
	{
		this.#navigate(this.list);
		return Array.from(this.parser.get_forbidden_functions());
	}
}

module.exports = checker;
