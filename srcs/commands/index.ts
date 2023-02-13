import exams from 'exams/index';
import i18n, { lang } from 'langs/index';
import clock from 'modules/clock';
import format from 'modules/format';

import finish from './finish';
import grademe from './grademe';
import help from './help';
import iddqd from './iddqd';
import status from './status';

import { command } from './interface';
import { stdout } from 'process';

interface fuzzy {
	name: string;
	ratio: number;
	check: boolean
}

class parse {
	public commands: command[];
	public commandsList: string[];
	public fuzzyCommands: fuzzy[];
	
	constructor() {
		this.commands = [
			finish,
			grademe,
			help,
			iddqd,
			status
		];
		this.commandsList = this.commands.reduce((acc: string[], cur) => {
			if (!cur.hide)
				return [ ...acc, cur.name ];
			return acc;
		}, []);
		this.fuzzyCommands = this.commands.map((e) => ({
			name: e.name,
			ratio: 0.0,
			check: false
		})) as fuzzy[];
	}

	fuzzySearch(command: string) {
		const _search = (id: number, str: string, ratio: number) => {
			const compare = String(this.fuzzyCommands[id].name.toLowerCase());
			let matches = 0;
	
			if (str.indexOf(compare) > -1) {
				this.fuzzyCommands[id].ratio = 1.0;
				this.fuzzyCommands[id].check = true;
			} else {
				for (let i = 0; i < compare.length; i++) {
					if (str.indexOf(compare[i]) > -1)
						++matches;
					else
						--matches;
				}
				this.fuzzyCommands[id].ratio = matches / str.length;
				this.fuzzyCommands[id].check = matches / str.length >= ratio || str === '';
			}
			if (this.fuzzyCommands[id].ratio < 0.0) {
				this.fuzzyCommands[id].ratio = 0.0;
				this.fuzzyCommands[id].check = false;
			}
		};
	
		for (const id in this.fuzzyCommands) {
			this.fuzzyCommands[id].ratio = 0.0;
			this.fuzzyCommands[id].check = false;
			_search(Number(id), command, 0.5);
		}
	}

	parse(line: string): string[] {
		return line
			.split(' ')
			.reduce((acc, cur) => {
				const el = cur.toLowerCase().replace(/\s+/g, '');
				if (el.length > 0)
					acc.push(el);
				return acc;
			}, [] as string[]);
	}

	getCommand(name: string): command | undefined {
		for (const el of this.commands) {
			if (el.name === name)
				return el;
		}
		return undefined;
	}
}
let instance: parse | undefined = undefined;

export const initCommands = (): void => {
	instance = new parse();
};

export const getCommandsList = (): string[] => {
	if (!instance)
		return [];
	return instance.commandsList;
};

export default async (line: string, lang: lang, exams: exams, clock: clock): Promise<void> => {
	if (!instance)
		instance = new parse();
	const commands = instance.parse(line);
	if (!commands.length)
		return;
	instance.fuzzySearch(commands[0]);
	if (!exams.options.infinite && clock.isFinish() && commands[0] === 'grademe') {
		stdout.clearLine(0);
		stdout.write(`${format.format.reset}${i18n('outOfTime', lang)}\n`);
		return;
	}
	const command = instance.getCommand(commands[0]);
	if (command)
		await command.exec(commands, lang, exams, clock);
	else {
		const print = [];
		for (const key in instance.commands) {
			if (instance.fuzzyCommands[key].ratio >= 0.4) {
				print.push({
					command: instance.commands[key].name,
					description: instance.commands[key].description[lang]
				});
			}
		}
		console.log(`${commands[0]} : ${format.foreground.normal.red}${i18n('error.command', lang)}${format.format.reset}`);
		if (Object.keys(print).length > 0) {
			console.log(i18n('error.help', lang));
			console.table(print);
		}
	}
};
