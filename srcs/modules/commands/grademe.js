/* eslint-disable no-prototype-builtins */
/* eslint-disable consistent-return */

require('../fspatch');
const fs = require('fs');
const process = require('process');
const path = require('path');
const crypto = require('crypto');
const { exec } = require('child_process');
const spinner = require('../spinner');
const COLORS = require('../colors');
const { timer } = require('../clock');
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
		const id = Math.floor(Math.random() * this.JSON.current.list.length);
		this.JSON.current.selected = this.JSON.current.list[id];

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
						fs.copyDirSync(path.join(this.JSON.path.exercice, el), path.join(this.JSON.path.subject, el));
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
			console.log(`${COLORS.redlight}${LANG.Grademe.Time} ${COLORS.bluelight}${timer(this.retryTime)} ${COLORS.reset}`);
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
		return new Promise((resolve) =>
		{
			exec(`git clone ${this.JSON.parent.git.render}`, {
				cwd: this.JSON.path.correction,
				shell: '/bin/bash',
				windowsHide: true,
			}, (err) =>
			{
				if (err)
					this.failed(resolve, err, true);
			}).on('exit', (code) =>
			{
				if (code === 0)
					this.execute_test(resolve);
			});
		});
	}

	execute_test(resolve)
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
						fs.copyDirSync(path.join(this.JSON.path.exercice, el), path.join(this.JSON.path.correction, el));
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

		exec('bash make.bash', {
			cwd: this.JSON.path.correction,
			shell: '/bin/bash',
			windowsHide: true,
		}, (err) =>
		{
			if (err)
				this.failed(resolve, err, true);
		}).on('exit', (code) =>
		{
			if (code !== 0)
			{
				this.failed(resolve, `errno: ${code}`, true);
			}
			else
			{
				const diff = fs.readFileSync(path.join(this.JSON.path.correction, '__diff'), { encoding: 'utf-8' });
				if (diff.length > 0)
				{
					this.failed(resolve, diff);
				}
				else
				{
					let isError = Boolean(false);
					if (this.JSON.current.selected.moulinette === true)
					{
						const check = new Checker(
							path.join(this.JSON.path.correction, 'render', this.JSON.current.selected.name),
							this.JSON.current.selected.allowed_functions,
						);
						const errors = check.check();
						if (errors.length)
						{
							isError = true;
							this.failed(resolve, errors);
						}
					}
					if (this.JSON.current.selected.leaks === true)
					{
						const leaks = new Valgrind(path.join(this.JSON.path.correction, 'valgrind.xml'));
						if (leaks.check() === true)
						{
							isError = true;
							this.failed(resolve, leaks.leaks);
						}
					}
					if (isError === false)
						this.success(resolve);
				}
			}
		});
	}

	success(resolve)
	{
		spinner.stop();
		process.stdout.clearLine();
		this.JSON.id += 1;
		this.JSON.goal.current += Number(this.JSON.goal.add);
		console.log(`${COLORS.greenlight}>>> ${LANG.Grademe.Success.toUpperCase()} <<<${COLORS.reset}`);
		if (this.JSON.goal.current >= this.JSON.goal.max)
		{
			console.log(`${COLORS.bluelight}${LANG.Grademe.Finish}${COLORS.reset}`);
			resolve('foo');
		}
		else
		{
			this.start();
			resolve('foo');
		}
	}

	failed(resolve, data, forceTrace = false)
	{
		spinner.stop();
		process.stdout.clearLine();
		this.JSON.retry += 1;

		this.oldTime += this.oldTime * Number(this.JSON.current.selected.exponent);
		this.retryTime = this.oldTime;

		if (forceTrace === false)
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
		resolve('foo');
	}
}

module.exports = Grademe;
