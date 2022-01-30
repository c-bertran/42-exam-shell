require('../fspatch');
const fs = require('fs');
const path = require('path');
const keywords = require('./keywords');

class Parser
{
	constructor(step, autorizedFunctions, forbiddenKeywords)
	{
		this.forbiddenKeywords = Array.from(forbiddenKeywords);
		this.functions = {
			declared: Array.from(autorizedFunctions),
			using: [],
		};
		this.keywords = [];

		this.typedef = [];
		this.errors = [];
		this.comments = [];

		this.step = step;
		this.blob = undefined;
	}

	parse(pathToFile)
	{
		this.comments = [];
		const info = {
			base: path.basename(pathToFile),
			ext: path.extname(pathToFile),
		};
		const define = keywords.get(info.ext);
		if (Object.keys(define).length)
		{
			this.blob = fs.readFileSync(pathToFile, { encoding: 'utf-8' });
			this.comments = Array.from(
				this.blob.matchAll(define.regex.comment),
				(el) => ({ start: el.index, end: el.index + el[0].length }),
			);

			const isDeclared = this.#get_declared(define, pathToFile);
			const isKeywords = this.#get_keywords(define, pathToFile);
			const isUsing = this.#get_using(define, pathToFile);

			for (const dec of isDeclared)
				this.functions.declared.push(dec.found);
			for (const key of isKeywords)
				this.keywords.push(key);
			for (const use of isUsing)
				this.functions.using.push(use);
		}
	}

	#get_declared(define)
	{
		return Array.from(
			this.blob.matchAll(define.regex.declar),
			(m) => ({ found: m[1], index: m.index }),
		).filter((el) =>
		{
			if (el.found.length > 0 && !this.#is_in_comment(el.index, el.index + el.found.length))
				return true;
			return false;
		});
	}

	#get_keywords(define, pathToFile)
	{
		let stringRegex = '\\s(';
		for (const el of define.keywords)
			stringRegex += `${el}|`;
		stringRegex = stringRegex.slice(0, stringRegex.length - 1);
		stringRegex += ')\\s';
		const regex = new RegExp(stringRegex, 'gm');
		return Array.from(
			this.blob.matchAll(regex),
			(el) => ({
				file: pathToFile, keyword: el[1], start: el.index, end: el.index + el[1].length,
			}),
		).filter((el) =>
		{
			if (el.keyword.length > 0 && !this.#is_in_comment(el.start, el.end))
				return true;
			return false;
		});
	}

	#get_using(define, pathToFile)
	{
		return Array.from(
			this.blob.matchAll(define.regex.using),
			(m) => ({ file: pathToFile, found: m[1], index: m.index }),
		).filter((el) =>
		{
			if (el.found.length > 0 && define.keywords.indexOf(el.found) === -1
			&& !this.#is_in_comment(el.index, el.index + el.found.length))
				return true;
			return false;
		});
	}

	#is_in_comment(start, end)
	{
		for (const comment of this.comments)
			if (start > comment.start && end < comment.end)
				return true;
		return false;
	}

	get_forbidden_functions()
	{
		if (!Array.isArray(this.step))
		{
			for (const funct of this.functions.using)
				if (this.functions.declared.indexOf(funct.found) === -1)
					this.errors.push(funct);
			for (const key of this.keywords)
				if (this.forbiddenKeywords.indexOf(key.keyword) === -1)
					this.errors.push(key);
		}
		else
		{
			if (this.step[0] === true)
				for (const funct of this.functions.using)
					if (this.functions.declared.indexOf(funct.found) === -1)
						this.errors.push(funct);
			if (this.step[1] === true)
				for (const key of this.keywords)
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
