/* ES6
import path from 'path';
import fs from 'fs';
import keywords from './keywords.js';
*/
require('../fspatch');
const fs = require('fs');
const path = require('path');
const keywords = require('./keywords');

class Parser
{
	constructor(autorizedFunctions)
	{
		this.functions = {
			declared: Array.from(autorizedFunctions),
			using: [],
		};
		this.errors = [];
		this.blob = undefined;
		this.comments = [];
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
			this.comments = [];
			const comments = {
				simple: this.blob.matchAll(define.regex.simple_comment),
				double: this.blob.matchAll(define.regex.double_comment),
			};
			for (const el of comments.simple)
				this.comments.push({ start: el.index, end: el.index + el[0].length });
			for (const el of comments.double)
				this.comments.push({ start: el.index, end: el.index + el[0].length });

			const declared = Array.from(
				this.blob.matchAll(define.regex.declar),
				(m) => ({ found: m[1], index: m.index }),
			).filter((el) =>
			{
				if (el.found.length > 0 && !this.#is_in_comment(el.index, el.index + el.found.length))
					return true;
				return false;
			});

			const using = Array.from(
				this.blob.matchAll(define.regex.using),
				(m) => ({ file: pathToFile, found: m[1], index: m.index }),
			).filter((el) =>
			{
				if (el.found.length > 0 && define.keywords.indexOf(el.found) === -1
				&& !this.#is_in_comment(el.index, el.index + el.found.length))
					return true;
				return false;
			});

			for (const dec of declared)
				this.functions.declared.push(dec.found);
			for (const use of using)
				this.functions.using.push(use);
		}
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
		for (const funct of this.functions.using)
			if (this.functions.declared.indexOf(funct.found) === -1)
				this.errors.push(funct);
		return this.errors;
	}
}

class checker
{
	/**
	 * The checker verifies if the code written by the user respects the set rules
	 * @param {String} directory path of the folder where these files are located
	 * @param {Array} autorizedFunctions list of external functions allowed in the project. By default no external functions are allowed. Pass an empty array to have the default feature.
	 */
	constructor(directory, autorizedFunctions = [])
	{
		const checkArgs = {
			directory: (typeof directory !== 'string') ? '(`directory` is not a String)' : '',
			functions: (!Array.isArray(autorizedFunctions)) ? '(`autorizedFunctions` is not a Array)' : '',
		};
		if (checkArgs.directory.length || checkArgs.functions.length)
			throw new Error(`${checkArgs.directory}${checkArgs.functions}`);

		this.list = this.#tree_files(directory);
		this.autorizedFunctions = autorizedFunctions;
		this.errors = undefined;
		this.parser = new Parser(this.autorizedFunctions);
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

// export default checker;
module.exports = checker;
