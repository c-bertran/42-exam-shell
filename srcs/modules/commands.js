/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
require('./fspatch');

const fs = require('fs');
const path = require('path');

class Commands
{
	constructor()
	{
		this.commandPath = path.join(__dirname, 'commands');
		this.list = fs.readdirSync(this.commandPath).map((file) =>
		{
			const __import = require(path.join(this.commandPath, file));
			if (typeof (__import) !== 'object' || (typeof (__import) === 'object' && (!__import.name || !__import.exec)))
				return false;
			__import['file'] = file; // eslint-disable-line dot-notation
			__import.name = __import.name.toLowerCase();
			__import.ratio = 0.0;
			__import.check = false;
			if (!__import.hide)
				__import.hide = false;
			return __import;
		}).filter((el) => el !== false);
		this.#checkIfDuplication();
	}

	#checkIfDuplication()
	{
		const count = (arr, find) => arr.filter((cur) => cur.name === find).length;

		this.list.forEach((el) =>
		{
			if (count(this.list, el.name) > 1)
			{
				let err = `The '${el.name}' command has duplicates. Here is the list of commands present to help you debug:\n\n`;
				this.list.forEach((_el, _index) =>
				{
					err += `${_index}: ${JSON.stringify(_el)}\n`;
				});
				throw new Error(err);
			}
		});
	}

	#fuzzySearch(commandName)
	{
		const _search = (id, str, ratio) =>
		{
			const compare = String(this.list[id].name.toLowerCase());
			let matches = Number(0);
			if (str.indexOf(compare) > -1)
			{
				this.list[id].ratio = 1.0;
				this.list[id].check = true;
			}
			else
			{
				for (let i = 0; i < compare.length; i++)
					(str.indexOf(compare[i]) > -1) ? ++matches : --matches;
				this.list[id].ratio = matches / str.length;
				this.list[id].check = matches / str.length >= ratio || str === '';
			}
			if (this.list[id].ratio < 0.0)
			{
				this.list[id].ratio = 0.0;
				this.list[id].check = false;
			}
		};

		for (const id in this.list)
			if (Object.prototype.hasOwnProperty.call(this.list, id))
			{
				this.list[id].ratio = 0.0;
				this.list[id].check = false;
				_search(id, commandName, 0.5);
			}
	}

	get(name)
	{
		const i = this.list.findIndex((el) => el.name === name.toLowerCase());
		if (i !== -1)
			return this.list[i];
		return {};
	}

	execute(data, JSON, LANG, TIMER, GRADEME)
	{
		const commands = data.split(' ').map((el) => el.toLowerCase());
		const occ = this.list.findIndex((el) => el.name === commands[0]);
		if (occ !== -1)
		{
			this.list[occ].exec(commands, JSON, LANG, TIMER, GRADEME);
			return [];
		}
		return this.list;
	}
}

module.exports = Commands;
