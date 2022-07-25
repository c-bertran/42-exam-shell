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
const formats = require('../formats');
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
				add: Number(Math.ceil(data.goal / data.exercices.length)),
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
		const saveName = this.JSON.current.selected.name;
		this.JSON.current.selected.name = saveName;

		this.JSON.path = {
			exercice: path.join(this.JSON.parent.options.exam, this.JSON.current.selected.name),
			subject: path.join(this.JSON.parent.git.subject, this.JSON.current.selected.name),
			correction: path.join(this.JSON.parent.git.temp, hexaID()),
		};

		fs.mkdir(this.JSON.path.subject, (err) =>
		{
			if (err)
				throw new Error(err.message);
			for (const el of this.JSON.current.selected.cp.user)
				if (el === '%SUBJECT%')
					fs.copyFile(path.join(this.JSON.path.exercice, 'subjects', this.JSON.parent.options.lang), path.join(this.JSON.path.subject, 'subject.txt'), (err2) =>
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
		console.log(`│ ${formats.foreground.light.blue}>> ${formats.format.reset}${LANG.Exercice.Start} ${formats.foreground.light.red}${this.JSON.current.selected.name}${formats.format.reset}`);
		console.log(`│ ${formats.foreground.light.blue}>> ${formats.format.reset}${LANG.Exercice.Dir} ${formats.foreground.light.green}~/${LANG.Git.render}/${this.JSON.current.selected.name}${formats.format.reset}`);
		console.log(`│ ${formats.foreground.light.blue}>> ${formats.format.reset}${LANG.Exercice.Goal} ${formats.foreground.light.magenta}${this.JSON.goal.add} ${formats.format.reset}${LANG.Exercice.Points}${formats.format.reset}`);
		console.log(`│ ${formats.foreground.light.blue}>> ${formats.format.reset}${LANG.Exercice.Level} ${formats.foreground.normal.yellow}${Number(this.JSON.goal.current)}${formats.format.reset}/${formats.foreground.light.blue}${this.JSON.goal.max}${formats.format.reset}`);
		console.log(`│ ${formats.foreground.light.blue}>> ${formats.format.reset}${LANG.Exercice.Retry}: ${formats.foreground.normal.yellow}${this.JSON.retry}${formats.format.reset}`);
		console.log('└────╯\n');
	}

	grade()
	{
		if (this.JSON.goal.current >= this.JSON.goal.max)
			return;
		if (this.retryTime > 0)
		{
			console.log(`${formats.foreground.light.red}${LANG.Grademe.Time} ${formats.foreground.light.blue}${secondsToClock(this.retryTime)} ${formats.format.reset}`);
			return;
		}
		spinner.start(LANG.Grademe.Correction, 'bar');
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
				if (err && err.code === 100)
					throw new Error(err.message);
				else
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
							this.failed(JSON.stringify(errors, null, 2));
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
		console.log(`${formats.foreground.light.green}>>> ${LANG.Grademe.Success.toUpperCase()} <<<${formats.format.reset}`);
		if (this.JSON.goal.current >= this.JSON.goal.max)
		{
			this.JSON.goal.current = this.JSON.goal.max;
			console.log(`${formats.foreground.light.blue}${LANG.Grademe.Finish}${formats.format.reset}`);
		}
		else
		{
			this.start();
		}
		this.promise.resolve('foo');
	}

	failed(data, forceTrace = false)
	{
		spinner.stop();
		process.stdout.clearLine();
		this.JSON.retry += 1;

		this.oldTime += this.oldTime * Number(this.JSON.current.selected.exponent);
		this.retryTime = this.oldTime;

		console.log(`${formats.foreground.light.red}>>> ${LANG.Grademe.Failed.toUpperCase()} <<<${formats.format.reset}`);
		if (this.JSON.current.selected.trace === true)
		{
			console.log(`${formats.format.reset}\n=== ${LANG.Grademe.Trace.toUpperCase()} ===`);
			if (Array.isArray(data))
				for (const el of data)
					console.log(path.basename(el.file), el.found);
			else
				console.log(data);
			console.log(`=============${formats.format.reset}`);
		}
		else if (forceTrace === true)
		{
			console.log(`\n=== ${LANG.Grademe.Error.toUpperCase()} ===`);
			console.log(`${formats.format.reset}${data}${formats.format.reset}`);
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
