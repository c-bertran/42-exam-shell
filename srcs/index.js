#!/usr/bin/env node

require('./modules/fspatch');

const { exec } = require('child_process');
const OS = require('os');
const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const path = require('path');
const process = require('process');
const prompts = require('prompts');
const readline = require('readline');

const Commands = require('./modules/commands');
const checkLib = require('./modules/checklib');
const formats = require('./modules/formats');
const Spinner = require('./modules/spinner');
const { convertTime, timer } = require('./modules/clock');

class Main
{
	constructor()
	{
		this.childServe = undefined;
		this.randomFinish = [
			'i\'m too young to die',
			'hey, not too rough',
			'hurt me plenty',
			'ultra-violence',
			'nightmare',
		];

		const examPath = path.join(__dirname, '..', 'exam');
		this.exam = fs.readdirSync(examPath).map((dir) =>
		{
			const filePath = path.join(examPath, dir);
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
		}).filter((dir) =>
		{
			if (dir !== undefined)
			{
				if (Object.prototype.hasOwnProperty.call(dir.data, 'desactivate'))
					return !dir.data.desactivate;
				return true;
			}
			return false;
		});

		this.LANG = undefined;
		const _LANG = fs.readFileSync(path.join(__dirname, 'lang', 'list.json'), { encoding: 'utf-8' });
		if (!_LANG)
		{
			console.error('List of lang not exist, exit');
			process.exit(1);
		}

		this.commands = new Commands();

		const generateID = crypto
			.randomBytes(Math.ceil(16 / 2))
			.toString('hex')
			.slice(0, 16);
		this.JSON = {
			LANGlist: JSON.parse(_LANG),
			args: process.argv.slice(2),
			options: {
				infinite: Boolean(false),
				doom: Boolean(false),
				lang: String,
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
		console.log('\n███████╗██╗  ██╗ █████╗ ███╗   ███╗███████╗██╗  ██╗███████╗██╗     ██╗\n██╔════╝╚██╗██╔╝██╔══██╗████╗ ████║██╔════╝██║  ██║██╔════╝██║     ██║\n█████╗   ╚███╔╝ ███████║██╔████╔██║███████╗███████║█████╗  ██║     ██║\n██╔══╝   ██╔██╗ ██╔══██║██║╚██╔╝██║╚════██║██╔══██║██╔══╝  ██║     ██║\n███████╗██╔╝ ██╗██║  ██║██║ ╚═╝ ██║███████║██║  ██║███████╗███████╗███████╗\n╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝\nby cbertran (cbertran@student.42.fr)\n');
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
		if (!this.JSON.options.lang)
			this.JSON.options.lang = 'en_US';
		const _base = fs.readFileSync(path.join(__dirname, '..', 'srcs', 'lang', `${this.JSON.options.lang}.json`));
		this.LANG = JSON.parse(_base);
		//#endregion

		const Exams = [];
		for (const exam of this.exam)
			Exams.push({ title: exam.data.name, value: exam.data.name });
		prompts([
			{
				type: 'multiselect',
				name: 'options',
				message: this.LANG.Options.Question,
				choices: [
					{
						title: ` ${this.LANG.Options.Infinite[0]} > ${this.LANG.Options.Infinite[1]}`,
						value: '--infinite',
					},
					{
						title: ` ${this.LANG.Options.Doom[0]}     > ${this.LANG.Options.Doom[1]}`,
						value: '--doom',
					},
				],
			},
			{
				type: 'select',
				name: 'exam',
				message: this.LANG.Select.Question,
				choices: Exams,
			},
		], {
			onCancel: () =>
			{
				console.error('For the program to work properly, you must at least select no options and an exam. Restart the application to do this');
				process.exit(127);
			},
		}).then((answer) =>
		{
			answer.lang = this.JSON.options.lang; // eslint-disable-line no-param-reassign

			if (answer.options.indexOf('--infinite') !== -1)
				this.JSON.options.infinite = true;
			if (answer.options.indexOf('--doom') !== -1)
				this.JSON.options.doom = true;

			for (const exam of this.exam)
				if (exam.data.name === answer.exam)
				{
					this.JSON.options.exam = exam.path;
					if (Object.prototype.hasOwnProperty.call(exam.data, 'time'))
					{
						this.TIMER.isRet = convertTime(exam.data.time);
						this.TIMER.end = this.TIMER.isRet.time;
					}
					break;
				}

			this.JSON.git.render = path.join(this.JSON.git.main, this.LANG.Git.render);
			this.JSON.git.subject = path.join(this.JSON.git.main, this.LANG.Git.subject);
			fs.mkdirSync(this.JSON.git.temp, { recursive: true });
			fs.mkdirSync(this.JSON.git.main, { recursive: true });
			fs.mkdirSync(this.JSON.git.render, { recursive: true });
			fs.mkdirSync(this.JSON.git.subject, { recursive: true });
			fs.copyFileSync(path.join(__dirname, '..', 'srcs', 'bash', 'init.bash'), path.join(this.JSON.git.render, 'init.bash'));
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
			console.error(`${formats.foreground.normal.red}${this.LANG.Errors.GitInit}${formats.format.reset}`);
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
						this.Shell.write(this.randomFinish[Math.floor(Math.random() * this.randomFinish.length)]);
						this.Shell.write(null, {
							name: 'enter',
						});
					}, this.TIMER.isRet.time * 1000);
				}
				console.log(`\n${formats.foreground.light.blue}${this.LANG.Info.Dir} '${formats.foreground.normal.green}${this.JSON.git.main}${formats.format.reset}'`);
				console.log(`${formats.foreground.light.blue}${this.LANG.Info.Git}${formats.format.reset}\n`);

				this.commands.get('grademe').init(this.JSON, this.LANG);

				this.Shell = readline.createInterface({
					input: process.stdin,
					output: process.stdout,
					prompt: `${formats.format.bold}${formats.foreground.light.green}examshell ${formats.foreground.light.magenta}>${formats.format.reset} `,
					terminal: true,
					tabSize: 4,
					completer: (line) =>
					{
						const hits = this.commands.autocomplete.filter((c) => c.startsWith(line));
						return [hits.length ? hits : this.commands.autocomplete, line];
					},
				});
				this.Shell.prompt();
				this.#main();
			}
			else
			{
				console.error(`${formats.foreground.normal.red}${this.LANG.Errors.Exec} ${formats.foreground.normal.magenta}${code}${formats.format.reset}`);
				process.exit(2);
			}
		});
	}

	#main()
	{
		this.Shell.on('line', async (data) =>
		{
			this.Shell.pause();
			await this.commands.execute(
				data,
				this.JSON,
				this.LANG,
				this.TIMER,
				this.commands.get('grademe').instance(),
			);
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

/**
 * Start application
 */
const start = () =>
{
	const main = new Main();
	const examshell = async () =>
	{
		await checkLib.check();
		main.init();
	};
	examshell();
};

Spinner.start('Checks if an update is available', 'bounce');
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
			Spinner.stop();
			process.stdout.clearLine();
			process.stdout.write(formats.erase.erase);
			const blob = JSON.parse(data);
			const currentVersion = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), { encoding: 'utf-8' })).version;
			if (currentVersion !== blob.tag_name)
			{
				console.log(`${formats.foreground.light.blue}The ${formats.foreground.light.red}${blob.tag_name}${formats.foreground.light.blue} version is available for download`);
				console.log(`${formats.format.reset}⇒ ${formats.foreground.light.green}https://github.com/c-bertran/examshell/releases/latest ${formats.format.reset}⇐`);
			}
			start();
		});
	},
).on('error', () =>
{
	Spinner.stop();
	process.stdout.clearLine();
	process.stdout.write(formats.erase.erase);
	console.log('An error has occurred, the update search is skipped');
	start();
}).setTimeout(15 * 1000);

process.on('uncaughtException', (err) =>
{
	const currentDate = (new Date()).toUTCString();

	console.error(`An error at ${currentDate} has occurred.\nDon't hesitate to open an issue on GitHub (https://github.com/c-bertran/examshell/issues) with the error code below :`);

	console.error(`${formats.foreground.normal.red}═══════════════ ${formats.foreground.normal.yellow}⚠${formats.format.reset}  Error ${formats.foreground.normal.yellow}⚠${formats.format.reset}  ${formats.foreground.normal.red}══════════════${formats.format.reset}`);

	console.error(`${formats.foreground.normal.magenta}══ Info    ═════════════════════════════${formats.format.reset}`);
	console.error(`Version      : ${JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), { encoding: 'utf-8' })).version}`);
	console.error(`UTC date     : ${currentDate}`);
	console.error(`Plateform    : ${OS.platform()} (${OS.arch()}) - ${OS.version()}`);
	console.error(`Heap usage   : ${((process.memoryUsage().heapTotal * 8) / (8 * 1000 * 1000)).toPrecision(2)}MB`);
	console.error(`Total memory : ${((OS.totalmem() * 8) / (8 * 1000 * 1000 * 1000)).toPrecision(2)}GB`);

	console.error(`\n${formats.foreground.normal.magenta}══ Message ═════════════════════════════${formats.format.reset}`);
	console.error(err.message);

	console.error(`\n${formats.foreground.normal.magenta}══ Stack   ═════════════════════════════${formats.format.reset}`);
	console.error(err.stack);

	console.error(`${formats.foreground.normal.red}══════════════════════════════════════════${formats.format.reset}`);
	process.exit(127);
});
