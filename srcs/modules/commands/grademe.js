/* eslint-disable no-prototype-builtins */
/* eslint-disable consistent-return */

require('../fspatch');
const fs = require('fs');
const process = require('process');
const path = require('path');
const crypto = require('crypto');
const { exec } = require('child_process');
const glob = require('glob');
const spinner = require('../spinner');
const COLORS = require('../colors');
const { secondsToClock } = require('../clock');
const Checker = require('../checker/checker');
const Valgrind = require('../checker/valgrind');

let LANG;

const hexaID = () => crypto
	.randomBytes(Math.ceil(16 / 2))
	.toString('hex')
	.slice(0, 16);

class Grademe
{
	constructor(json, lang)
	{
		const data = JSON.parse(fs.readFileSync(path.join(json.options.exam, 'exam.json'), { encoding: 'utf-8' }));
		LANG = lang;
		this.JSON = {
			parent: json,
			dirname: json.options.exam,
			data,
			goal: {
				current: Number(0),
				max: Number(data.goal),
				add: Number(Math.floor(data.goal / data.exercices.length)),
			},
			id: Number(0),
			numberExercices: data.exercices.length,
			retry: Number(0),
			current: Object,
			path: Object,
		};
		this.oldTime = Number(0);
		this.retryTime = Number(0);
		this.promise = {
			resolve: Function,
			reject: Function,
		};
		setInterval(() =>
		{
			if (this.retryTime > 0)
				this.retryTime -= 1;
		}, 1000);
	}

	start()
	{
		this.JSON.retry = 0;
		this.JSON.current = this.JSON.data.exercices[this.JSON.id];
		const id = Math.floor(Math.random() * this.JSON.current.length);
		this.JSON.current.selected = this.JSON.current[id];

		const diff = this.JSON.current.selected.difficulty;
		const saveName = this.JSON.current.selected.name;
		if (!Object.prototype.hasOwnProperty.call(diff, 'normal')
			&& !Object.prototype.hasOwnProperty.call(diff, 'hard'))
			throw new Error('Error in JSON declaration exercice');
		if (this.JSON.parent.options.difficulty === 'hard'
			&& Object.prototype.hasOwnProperty.call(diff, 'hard'))
		{
			this.JSON.current.selected = diff.hard;
		}
		else
		{
			this.JSON.parent.options.difficulty = 'normal';
			this.JSON.current.selected = diff.normal;
		}
		this.JSON.current.selected.name = saveName;

		this.JSON.path = {
			exercice: path.join(this.JSON.parent.options.exam, this.JSON.current.selected.name, this.JSON.parent.options.difficulty),
			subject: path.join(this.JSON.parent.git.subject, this.JSON.current.selected.name),
			correction: path.join(this.JSON.parent.git.temp, hexaID()),
		};

		fs.mkdir(this.JSON.path.subject, (err) =>
		{
			if (err)
				throw new Error(err.message);
			for (const el of this.JSON.current.selected.cp.user)
				if (el === '%SUBJECT%')
					fs.copyFile(path.join(this.JSON.path.exercice, this.JSON.parent.options.lang), path.join(this.JSON.path.subject, 'subject.txt'), (err2) =>
					{
						if (err2)
							throw new Error(err2.message);
					});
				else
					try
					{
						const files = glob.sync(path.join(this.JSON.path.exercice, el));
						for (const file of files)
							fs.copyDirSync(file, path.join(this.JSON.path.subject, path.basename(file)));
					}
					catch (err2)
					{
						throw new Error(err2.message);
					}
		});

		fs.mkdir(this.JSON.path.correction, (err) =>
		{
			if (err)
				throw new Error(err.message);
		});

		this.oldTime = 1;
		this.retryTime = 1;

		this.print_info();
	}

	print_info()
	{
		console.log('┌────╮');
		console.log(`│ ${COLORS.bluelight}>> ${COLORS.reset}${LANG.Exercice.Start} ${COLORS.redlight}${this.JSON.current.selected.name}${COLORS.reset}`);
		console.log(`│ ${COLORS.bluelight}>> ${COLORS.reset}${LANG.Exercice.Dir} ${COLORS.greenlight}~/${LANG.Git.render}/${this.JSON.current.selected.name}${COLORS.reset}`);
		console.log(`│ ${COLORS.bluelight}>> ${COLORS.reset}${LANG.Exercice.Goal} ${COLORS.magenta}${this.JSON.goal.add} ${COLORS.reset}${LANG.Exercice.Points}${COLORS.reset}`);
		console.log(`│ ${COLORS.bluelight}>> ${COLORS.reset}${LANG.Exercice.Level} ${COLORS.yellow}${Number(this.JSON.goal.current)}${COLORS.reset}/${COLORS.bluelight}100${COLORS.reset}`);
		console.log(`│ ${COLORS.bluelight}>> ${COLORS.reset}${LANG.Exercice.Retry}: ${COLORS.yellow}${this.JSON.retry}${COLORS.reset}`);
		console.log('└────╯\n');
	}

	grade()
	{
		if (this.retryTime > 0)
		{
			console.log(`${COLORS.redlight}${LANG.Grademe.Time} ${COLORS.bluelight}${secondsToClock(this.retryTime)} ${COLORS.reset}`);
			return;
		}
		spinner.spin(LANG.Grademe.Correction);
		try
		{
			fs.rmSync(this.JSON.path.correction, { recursive: true, force: true });
			fs.mkdirSync(this.JSON.path.correction);
		}
		catch (err)
		{
			console.error(err);
			process.exit(-5);
		}
		this.isError = false;
		return new Promise((resolve, reject) =>
		{
			this.promise.resolve = resolve;
			this.promise.reject = reject;
			exec(`git clone ${this.JSON.parent.git.render}`, {
				cwd: this.JSON.path.correction,
				shell: '/bin/bash',
				windowsHide: true,
			}, (err, stdout, stderr) =>
			{
				if (err || (stderr.length && /warning: You appear to have cloned an empty repository/gm.test(stderr)))
					this.failed((stderr.length) ? stderr : `errno: ${err.code}`, true);
				else
					this.execute_test();
			});
		});
	}

	execute_test()
	{
		try
		{
			fs.copyFileSync(path.join(__dirname, '..', '..', 'bash', 'leaks.bash'), path.join(this.JSON.path.correction, 'leaks.bash'));
			for (const el of this.JSON.current.selected.cp.checker)
				if (el === '%MAKE%')
					fs.copyFileSync(path.join(this.JSON.path.exercice, 'make.bash'), path.join(this.JSON.path.correction, 'make.bash'));
				else
					try
					{
						const files = glob.sync(path.join(this.JSON.path.exercice, el));
						for (const file of files)
							fs.copyDirSync(file, path.join(this.JSON.path.correction, path.basename(file)));
					}
					catch (err2)
					{
						throw new Error(err2.message);
					}
		}
		catch (err)
		{
			console.error(err);
			process.exit(-3);
		}

		exec(`bash make.bash ${LANG.Git.render}`, {
			cwd: this.JSON.path.correction,
			shell: '/bin/bash',
			windowsHide: true,
		}, (err, stdout, stderr) =>
		{
			if (err || stderr.length)
			{
				this.failed((stderr.length) ? stderr : `errno: ${err.code}`, true);
			}
			else
			{
				const diff = fs.readFileSync(path.join(this.JSON.path.correction, '__diff'), { encoding: 'utf-8' });
				if (diff.length > 0)
				{
					this.failed(diff);
				}
				else
				{
					let isError = Boolean(false);
					if (this.JSON.current.selected.moulinette === true || Array.isArray(this.JSON.current.selected.moulinette))
					{
						const elements = {
							functs: (Object.prototype.hasOwnProperty.call(this.JSON.current.selected, 'allowed_functions')) ? this.JSON.current.selected.allowed_functions : [],
							keys: (Object.prototype.hasOwnProperty.call(this.JSON.current.selected, 'forbidden_keywords')) ? this.JSON.current.selected.forbidden_keywords : [],
						};
						const check = new Checker(
							path.join(this.JSON.path.correction, 'render', this.JSON.current.selected.name),
							this.JSON.current.selected.moulinette,
							elements.functs,
							elements.keys,
						);
						const errors = check.check();
						if (errors.length)
						{
							isError = true;
							this.failed(errors);
						}
					}
					if (this.JSON.current.selected.leaks === true)
					{
						const ret = {
							leaks: [],
							fds: [],
						};
						const dirList = fs.readdirSync(this.JSON.path.correction, { encoding: 'utf-8', withFileTypes: false });
						dirList.forEach((file) =>
						{
							if (/^valgrind_\d+.log/.test(file))
							{
								const valgrind = new Valgrind(path.join(this.JSON.path.correction, file));
								if (valgrind.is_leaks())
									ret.leaks.push(valgrind.leaks);
								if (valgrind.is_open_fds())
									ret.fds.push(valgrind.fds);
							}
						});
						if (ret.leaks > 0)
						{
							isError = true;
							this.failed(JSON.stringify(ret.leaks, null, 4));
						}
						else if (ret.fds > 0)
						{
							isError = true;
							this.failed(JSON.stringify(ret.fds, null, 4));
						}
					}
					if (isError === false)
						this.success();
				}
			}
		});
	}

	success()
	{
		spinner.stop();
		process.stdout.clearLine();
		this.JSON.id += 1;
		this.JSON.goal.current += Number(this.JSON.goal.add);
		console.log(`${COLORS.greenlight}>>> ${LANG.Grademe.Success.toUpperCase()} <<<${COLORS.reset}`);
		if (this.JSON.goal.current >= this.JSON.goal.max)
			console.log(`${COLORS.bluelight}${LANG.Grademe.Finish}${COLORS.reset}`);
		else
			this.start();
		this.promise.resolve('foo');
	}

	failed(data, forceTrace = false)
	{
		spinner.stop();
		process.stdout.clearLine();
		this.JSON.retry += 1;

		this.oldTime += this.oldTime * Number(this.JSON.current.selected.exponent);
		this.retryTime = this.oldTime;

		console.log(`${COLORS.redlight}>>> ${LANG.Grademe.Failed.toUpperCase()} <<<${COLORS.reset}`);
		if (this.JSON.current.selected.trace === true)
		{
			console.log(`${COLORS.reset}\n=== ${LANG.Grademe.Trace.toUpperCase()} ===`);
			if (Array.isArray(data))
				for (const el of data)
					console.log(path.basename(el.file), el.found);
			else
				console.log(data);
			console.log(`=============${COLORS.reset}`);
		}
		else if (forceTrace === true)
		{
			console.log(`\n=== ${LANG.Grademe.Error.toUpperCase()} ===`);
			console.log(`${COLORS.reset}${data}${COLORS.reset}`);
			console.log('=============');
		}
		if (this.JSON.parent.options.doom === true)
			fs.rm(this.JSON.parent.git.render, { recursive: true, force: true }, (err) =>
			{
				if (!err)
				{
					fs.mkdirSync(this.JSON.parent.git.render, { recursive: true });
					fs.copyFileSync(path.join(__dirname, '..', '..', 'bash', 'init.bash'), path.join(this.JSON.parent.git.render, 'init.bash'));
					exec('bash init.bash', {
						cwd: this.JSON.parent.git.render,
						shell: '/bin/bash',
						windowsHide: true,
					}).on('exit', () =>
					{
						fs.rmSync(path.join(this.JSON.parent.git.render, 'init.bash'), { force: true });
					});
				}
			});
		this.print_info();
		this.promise.reject('foo');
	}
}

module.exports = Grademe;
