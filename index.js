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
const inquirer = require('inquirer');

const checkLib = require('./srcs/modules/checklib');
const { logo } = require('./srcs/text');
const COLORS = require('./srcs/modules/colors');
const finish = require('./srcs/modules/commands/finish');
const Grademe = require('./srcs/modules/commands/grademe');
const help = require('./srcs/modules/commands/help');
const IDDQD = require('./srcs/modules/commands/iddqd');
const status = require('./srcs/modules/commands/status');

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
			start: 0,
			end: 10800,
			finish: false,
			printPrompt: false,
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
				langArr.push(x);
		const selectedLang = await inquirer.prompt([
			{
				type: 'list',
				name: 'lang',
				message: 'Select your language',
				choices: langArr,
			},
		]).then((answer) => answer).catch((error) =>
		{
			if (error.isTtyError)
				console.error('Prompt couldn\'t be rendered in the current environment');
			else
				console.error(error.message);
			process.exit(-1);
		});

		for (const x in this.JSON.LANGlist)
			if (x === selectedLang.lang)
			{
				this.JSON.options.lang = this.JSON.LANGlist[x];
				break;
			}
		const _base = fs.readFileSync(path.join(__dirname, 'srcs', 'lang', `${this.JSON.options.lang}.json`));
		LANG = JSON.parse(_base);
		const ListDiff = [
			{ Difficulty: LANG.Difficulty.List[0], Equal: 'normal' },
			{ Difficulty: LANG.Difficulty.List[1], Equal: 'hard' },
		];
		//#endregion

		const Exams = [];
		for (const exam of Exam.list)
			Exams.push(exam.data.name);
		inquirer.prompt([
			{
				type: 'checkbox',
				name: 'options',
				message: LANG.Options.Question,
				choices: [
					{
						name: ` ${LANG.Options.Infinite[0]} > ${LANG.Options.Infinite[1]}`,
						value: '--infinite',
					},
					{
						name: ` ${LANG.Options.Doom[0]}     > ${LANG.Options.Doom[1]}`,
						value: '--doom',
					},
				],
			},
			{
				type: 'list',
				name: 'difficulty',
				message: LANG.Difficulty.Question,
				choices: LANG.Difficulty.List,
			},
			{
				type: 'list',
				name: 'exam',
				message: LANG.Select.Question,
				choices: Exams,
			},
		]).then((answer) =>
		{
			// Add lang key for more convenience
			answer.lang = selectedLang.lang; // eslint-disable-line no-param-reassign

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
					setInterval(() => this.TIMER.start++, 1000);
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
					}, (this.TIMER.end * 1000));
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
				status.exec(this.JSON, this.TIMER);
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
					await this.Grade.grade(this.TIMER);
			}
			else if (command === 'IDDQD' || command === 'iddqd')
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
			process.exit(0);
		});
		this.Shell.on('SIGCONT', () =>
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
