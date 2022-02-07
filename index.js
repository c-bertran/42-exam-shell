#!/usr/bin/env node

require('./srcs/modules/fspatch');
const fs = require('fs');
const https = require('https');
const { exec } = require('child_process');
const OS = require('os');
const path = require('path');
const crypto = require('crypto');
const process = require('process');
const readline = require('readline');
const prompts = require('prompts');

const checkLib = require('./srcs/modules/checklib');
const { logo } = require('./srcs/text');
const COLORS = require('./srcs/modules/colors');
const finish = require('./srcs/modules/commands/finish');
const Grademe = require('./srcs/modules/commands/grademe');
const help = require('./srcs/modules/commands/help');
const IDDQD = require('./srcs/modules/commands/iddqd');
const status = require('./srcs/modules/commands/status');
const { timer } = require('./srcs/modules/clock');

let LANG;

const RandomFinish = [
	'i\'m too young to die',
	'hey, not too rough',
	'hurt me plenty',
	'ultra-violence',
	'nightmare',
];

const hexaID = () => crypto
	.randomBytes(Math.ceil(16 / 2))
	.toString('hex')
	.slice(0, 16);

let childServe;

/**
 * Transform string time to real time
 * Accept days `d`, hours `h`, minutes `m`, seconds `s`
 * Exemple: `3d 14h 41m 17s`
 * @param {String} time String containing time information
 * @returns {Object} Time parsed in array
 */
const ConvertTime = (time) =>
{
	const regex = /(?<days>\d*)d|(?<hours>\d*)h|(?<minutes>\d*)m|(?<seconds>\d*)s/gm;
	const ret = {
		days: Number(0),
		hours: Number(0),
		minutes: Number(0),
		seconds: Number(0),
		time: Number(0),
	};

	const match = Array.from(time.matchAll(regex), (m) => (
		{
			days: Number(m.groups.days),
			hours: Number(m.groups.hours),
			minutes: Number(m.groups.minutes),
			seconds: Number(m.groups.seconds),
		}
	));
	for (const obj of match)
	{
		if (!Number.isNaN(obj.days))
			ret.days += obj.days;
		if (!Number.isNaN(obj.hours))
			ret.hours += obj.hours;
		if (!Number.isNaN(obj.minutes))
			ret.minutes += obj.minutes;
		if (!Number.isNaN(obj.seconds))
			ret.seconds += obj.seconds;
	}
	ret.time += ret.days * 86400;
	ret.time += ret.hours * 3600;
	ret.time += ret.minutes * 60;
	ret.time += ret.seconds;
	return ret;
};

class Examen
{
	constructor()
	{
		this.path = path.join(__dirname, 'exam');
		this.exam = fs.readdirSync(this.path).map((dir) =>
		{
			const filePath = path.join(this.path, dir);
			if (fs.statSync(filePath).isDirectory())
				try
				{
					const blob = JSON.parse(fs.readFileSync(path.join(filePath, 'exam.json'), { encoding: 'utf-8' }));
					return { path: filePath, data: blob };
				}
				catch (err)
				{
					return undefined;
				}
			return undefined;
		}).filter((dir) => dir !== undefined);
	}

	get list()
	{
		return this.exam;
	}
}

const Exam = new Examen();

class Main
{
	constructor()
	{
		const _LANG = fs.readFileSync(path.join(__dirname, 'srcs', 'lang', 'list.json'), { encoding: 'utf-8' });
		if (!_LANG)
		{
			console.error('List of lang not exist, exit');
			process.exit(1);
		}
		const generateID = hexaID();
		this.JSON = {
			LANGlist: JSON.parse(_LANG),
			args: process.argv.slice(2),
			options: {
				infinite: Boolean(false),
				doom: Boolean(false),
				lang: String,
				difficulty: String,
				exam: String,
			},
			git: {
				id: generateID,
				main: path.join(OS.homedir(), 'examshell', generateID),
				temp: path.join(OS.tmpdir(), 'examshell'),
				render: String,
				subject: String,
			},
		};
		this.TIMER = {
			finish: false,
			printPrompt: false,
			isRet: Object,
		};
		globalThis.TIMER = this.TIMER;
		this.Grade = undefined;
		this.Shell = undefined;
		fs.access(this.JSON.git.temp, (err) =>
		{
			if (!err)
				fs.rm(this.JSON.git.temp, { recursive: true, force: true }, (err2) =>
				{
					if (err2)
						throw new Error(err2);
				});
		});
	}

	async init()
	{
		console.log(logo);

		//#region Lang selection
		const langArr = [];
		for (const x in this.JSON.LANGlist)
			if (Object.prototype.hasOwnProperty.call(this.JSON.LANGlist, x))
				langArr.push({ title: x, value: this.JSON.LANGlist[x] });
		this.JSON.options.lang = await prompts({
			type: 'select',
			name: 'lang',
			message: 'Select your language',
			choices: langArr,
			initial: 0,
		}).then((data) => data.lang).catch((error) =>
		{
			if (error.isTtyError)
				console.error('Prompt couldn\'t be rendered in the current environment');
			else
				console.error(error.message);
			process.exit(-1);
		});

		const _base = fs.readFileSync(path.join(__dirname, 'srcs', 'lang', `${this.JSON.options.lang}.json`));
		LANG = JSON.parse(_base);
		const ListDiff = [
			{ Difficulty: LANG.Difficulty.List[0], Equal: 'normal' },
			{ Difficulty: LANG.Difficulty.List[1], Equal: 'hard' },
		];
		//#endregion

		const Exams = [];
		for (const exam of Exam.list)
			Exams.push({ title: exam.data.name, value: exam.data.name });
		prompts([
			{
				type: 'multiselect',
				name: 'options',
				message: LANG.Options.Question,
				choices: [
					{
						title: ` ${LANG.Options.Infinite[0]} > ${LANG.Options.Infinite[1]}`,
						value: '--infinite',
					},
					{
						title: ` ${LANG.Options.Doom[0]}     > ${LANG.Options.Doom[1]}`,
						value: '--doom',
					},
				],
			},
			{
				type: 'select',
				name: 'value',
				message: LANG.Difficulty.Question,
				choices: LANG.Difficulty.List,
			},
			{
				type: 'select',
				name: 'exam',
				message: LANG.Select.Question,
				choices: Exams,
			},
		]).then((answer) =>
		{
			answer.lang = this.JSON.options.lang; // eslint-disable-line no-param-reassign

			if (answer.options.indexOf('--infinite') !== -1)
				this.JSON.options.infinite = true;
			if (answer.options.indexOf('--doom') !== -1)
				this.JSON.options.doom = true;

			for (const el of ListDiff)
				if (el.Difficulty === answer.difficulty)
				{
					this.JSON.options.difficulty = el.Equal;
					break;
				}

			for (const exam of Exam.list)
				if (exam.data.name === answer.exam)
				{
					this.JSON.options.exam = exam.path;
					if (Object.prototype.hasOwnProperty.call(exam.data, 'time'))
					{
						this.TIMER.isRet = ConvertTime(exam.data.time);
						this.TIMER.end = this.TIMER.isRet.time;
					}
					break;
				}

			this.JSON.git.render = path.join(this.JSON.git.main, LANG.Git.render);
			this.JSON.git.subject = path.join(this.JSON.git.main, LANG.Git.subject);
			fs.mkdirSync(this.JSON.git.temp, { recursive: true });
			fs.mkdirSync(this.JSON.git.main, { recursive: true });
			fs.mkdirSync(this.JSON.git.render, { recursive: true });
			fs.mkdirSync(this.JSON.git.subject, { recursive: true });
			fs.copyFileSync(path.join(__dirname, 'srcs', 'bash', 'init.bash'), path.join(this.JSON.git.render, 'init.bash'));
			this.#init_level();
		}).catch((error) =>
		{
			if (error.isTtyError)
				console.error('Prompt couldn\'t be rendered in the current environment');
			else
				console.error(error.message);
			process.exit(-1);
		});
	}

	#init_level()
	{
		const bash = exec('bash init.bash', {
			cwd: this.JSON.git.render,
			shell: '/bin/bash',
			windowsHide: true,
		});
		bash.stderr.on('data', () =>
		{
			console.error(`${COLORS.red}${LANG.Errors.GitInit}${COLORS.reset}`);
			process.exit(2);
		});
		bash.on('exit', (code) =>
		{
			fs.rmSync(path.join(this.JSON.git.render, 'init.bash'), { force: true });
			if (code === 0)
			{
				if (!this.JSON.options.infinite)
				{
					setInterval(() => timer(this.TIMER.isRet), 1000);
					setTimeout(() =>
					{
						fs.rm(this.JSON.git.temp, { recursive: true, force: true }, (err) =>
						{
							// Callback present is here for rimraf error if no callback provided
							if (err)
								;
						});
						this.TIMER.finish = true;
						this.Shell.write(null, {
							ctrl: true,
							name: 'u',
						});
						this.Shell.write(RandomFinish[Math.floor(Math.random() * RandomFinish.length)]);
						this.Shell.write(null, {
							name: 'enter',
						});
					}, this.TIMER.isRet.time * 1000);
				}
				console.log(`\n${COLORS.bluelight}${LANG.Info.Dir} '${COLORS.green}${this.JSON.git.main}${COLORS.reset}'`);
				console.log(`${COLORS.bluelight}${LANG.Info.Git}${COLORS.reset}\n`);
				this.Grade = new Grademe(this.JSON, LANG);
				this.Grade.start();
				this.Shell = readline.createInterface({
					input: process.stdin,
					output: process.stdout,
					prompt: `${COLORS.greenlight}examshell ${COLORS.magenta}>${COLORS.reset} `,
					completer: (line) =>
					{
						const commands = ['status', 'grademe', 'help', 'finish'];
						const hits = commands.filter((c) => c.startsWith(line));
						return [hits.length ? hits : commands, line];
					},
					terminal: true,
					tabSize: 4,
				});
				this.Shell.prompt();
				this.#main();
			}
			else
			{
				console.error(`${COLORS.red}${LANG.Errors.Exec} ${COLORS.magenta}${code}${COLORS.reset}`);
				process.exit(2);
			}
		});
	}

	#main()
	{
		this.Shell.on('line', async (data) =>
		{
			this.Shell.pause();
			const args = data.split(' ');
			const command = args[0].toLowerCase();
			if (command === 'status')
			{
				status.exec(this.JSON, this.TIMER.isRet, this.Grade);
			}
			else if (command === 'finish')
			{
				finish.exec(this.JSON);
			}
			else if (command === 'help')
			{
				help.exec(args, LANG);
			}
			else if (command === 'grademe' && !this.TIMER.printPrompt)
			{
				if (!this.TIMER.finish)
					try
					{
						await this.Grade.grade(this.TIMER);
					}
					catch (error)
					{
						// do nothing, everything is made inside grademe class
					}
			}
			else if (command === 'iddqd')
			{
				if (childServe === undefined)
					childServe = new IDDQD();
				childServe.print();
			}
			else if (data.length)
			{
				if (this.TIMER.finish && !this.TIMER.printPrompt)
				{
					this.TIMER.printPrompt = true;
					process.stdout.clearLine();
					process.stdout.write(`${COLORS.reset}${LANG.OutOfTime}\n`);
				}
				else
				{
					console.log(`${command} : ${COLORS.red}${LANG.Errors.Command}`);
				}
			}
			this.Shell.resume();
			this.Shell.prompt();
		});
		this.Shell.on('SIGINT', () =>
		{
			process.stdout.write('\n');
			this.Shell.write(null, {
				ctrl: true,
				name: 'u',
			});
			this.Shell.prompt();
		});
		this.Shell.on('SIGCONT', () =>
		{
			process.stdout.write('\n');
			process.exit(0);
		});
		this.Shell.on('SIGTSTP', () =>
		{
			process.stdout.write('\n');
			process.exit(0);
		});
	}
}

https.get(
	'https://api.github.com/repos/c-bertran/examshell/releases/latest',
	{
		headers: { 'User-Agent': 'Mozilla/5.0' },
	},
	(res) =>
	{
		res.setEncoding('utf8');
		let data = '';
		res.on('data', (chunk) =>
		{
			data += chunk;
		});
		res.on('end', () =>
		{
			const blob = JSON.parse(data);
			const currentVersion = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), { encoding: 'utf-8' })).version;
			if (currentVersion !== blob.tag_name)
			{
				console.log(`${COLORS.bluelight}The ${COLORS.redlight}${blob.tag_name}${COLORS.bluelight} version is available for download`);
				console.log(`${COLORS.reset}⇒ ${COLORS.greenlight}https://github.com/c-bertran/examshell/releases/latest ${COLORS.reset}⇐`);
			}

			const main = new Main();
			const examshell = async () =>
			{
				await checkLib.check();
				main.init();
			}; examshell();
		});
	},
).on('error', (error) => console.error(error));
