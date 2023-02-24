import { exec } from 'child_process';
import { randomBytes } from 'crypto';
import { copyFileSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'fs';
import { copyFile, rm,  mkdir as mkdirPromise } from 'fs/promises';
import { glob } from 'glob';
import { homedir, tmpdir } from 'os';
import { basename, resolve } from 'path';
import { stdout } from 'process';

import checker from 'checker/index';
import valgrind from 'checker/valgrind';
import format from 'modules/format';
import copyDirSync from 'modules/fsCopyDir';
import error from 'modules/error';
import customExamList from 'modules/customExamList';
import spinner from 'modules/spinner';
import i18n, { lang } from 'langs/index';
import examList from './exams';
import { examDefinition } from './interface';

export default class {
	private randId: () => string;
	private exams: examDefinition[];
	public options: { infinite: boolean; doom: boolean; lang: lang };
	private timer: {
		interval: undefined | NodeJS.Timer;
		retry: number;
		old: number;
	};

	public generateId: string;
	public exam: {
		id: number;
		step: number;
		currentStep: number;
		exerciseSelected: number;
		retry: number;
		goal: {
			current: number;
			max: number;
			add: number;
		}
		path: {
			exercise: string;
			subject: string;
			correction: string;
		}
	};
	public git: {
		main: string;
		temp: string;
		render: string;
		subject: string;
	};

	constructor(id: string, options: { infinite: boolean; doom: boolean; lang: lang }) {
		this.exams = [ ...examList, ...customExamList() ];
	
		const idSelected = this.exams.findIndex((e) => e.id === id);
		if (idSelected === -1)
			error(30, { data: id, exit: true });

		this.randId = () => randomBytes(Math.ceil(16 / 2)).toString('hex').slice(0, 16);
		this.timer = { interval: undefined, retry: 0, old: 0 };
		this.exam = {
			id: idSelected, step: 0, currentStep: 0, exerciseSelected: 0, retry: 0,
			goal: {
				current: 0,
				max: this.exams[idSelected].goal,
				add: Math.ceil(this.exams[idSelected].goal / this.exams[idSelected].exercises.length)
			},
			path: { exercise: '', subject: '', correction: '' }
		};
		this.exam.step = this.exams[this.exam.id].exercises.length;
		this.options = options;
		this.generateId = this.randId();

		const temp = resolve(homedir(), 'examshell', this.generateId);
		this.git = {
			main: temp,
			temp: resolve(tmpdir(), 'examshell'),
			render: resolve(temp, i18n('git.render', options.lang) as string),
			subject: resolve(temp, i18n('git.subject', options.lang) as string),
		};
		try {
			rmSync(this.git.temp, { recursive: true, force: true });
		} catch (e: any) {
			error(31, { exit: true });
		}
	}

	init(): void {
		try {
			mkdirSync(this.git.temp, { recursive: true });
			mkdirSync(this.git.main, { recursive: true });
			mkdirSync(this.git.render, { recursive: true });
			mkdirSync(this.git.subject, { recursive: true });
			copyFileSync(
				resolve(__dirname, 'data', 'shell', 'init.bash'),
				resolve(this.git.render, 'init.bash')
			);
		} catch (e) {
			error(32, { exit: true });
		}
	}

	start(): Promise<void> {
		this.timer.interval = setInterval(() => {
			if (this.timer.retry > 0)
				--this.timer.retry;
		}, 1000);

		return new Promise((res, rej) => {
			const bash = exec('bash init.bash', {
				cwd: this.git.render,
				shell: '/bin/bash',
				windowsHide: true,
				timeout: 15000
			});
			if (bash && bash.stderr) {
				bash.stderr.on('data', () => {
					rej(`${format.foreground.normal.red}${i18n('error.gitInit', this.options.lang)}${format.format.reset}`);
				});
				bash.on('error', (e) => {
					rej(`${format.foreground.normal.red}${e.message}${format.format.reset}`);
				});
				bash.on('exit', (code) => {
					rm(resolve(this.git.render, 'init.bash'), { force: true });
					if (code === 0)
						res();
					else
						rej(`${format.foreground.normal.red}${i18n('error.exec', this.options.lang)} ${format.foreground.normal.magenta}${code}${format.format.reset}`);
				});
			} else
				rej('child exec failed');
		});
	}

	stop(): Promise<void> {
		return new Promise((res) => {
			if (this.timer.interval)
				clearInterval(this.timer.interval);
			rm(this.git.temp, { recursive: true, force: true })
				.then(() => res())
				.catch(() => res());
		});
	}

	info(): void {
		const exercise = this.exams[this.exam.id].exercises[this.exam.currentStep][this.exam.exerciseSelected];
		console.log('┌────╮');
		console.log(`│ ${format.foreground.light.blue}>> ${format.format.reset}${i18n('exercise.start', this.options.lang)} ${format.foreground.light.red}${exercise.name[this.options.lang]}${format.format.reset}`);
		console.log(`│ ${format.foreground.light.blue}>> ${format.format.reset}${i18n('exercise.dir', this.options.lang)} ${format.foreground.light.green}~/${i18n('git.render', this.options.lang)}/${exercise.name[this.options.lang]}${format.format.reset}`);
		console.log(`│ ${format.foreground.light.blue}>> ${format.format.reset}${i18n('exercise.goal', this.options.lang)} ${format.foreground.light.magenta}${this.exam.goal.add} ${format.format.reset}${i18n('exercise.points', this.options.lang)}${format.format.reset}`);
		console.log(`│ ${format.foreground.light.blue}>> ${format.format.reset}${i18n('exercise.level', this.options.lang)} ${format.foreground.normal.yellow}${this.exam.goal.current}${format.format.reset}/${format.foreground.light.blue}${this.exam.goal.max}${format.format.reset}`);
		console.log(`│ ${format.foreground.light.blue}>> ${format.format.reset}${i18n('exercise.retry', this.options.lang)}: ${format.foreground.normal.yellow}${this.exam.retry}${format.format.reset}`);
		console.log('└────╯\n');
	}

	nextExercise(): Promise<void> {
		this.exam.exerciseSelected = Math.floor(
			Math.random() * this.exams[this.exam.id].exercises[this.exam.currentStep].length
		);
		const selectexercise = this.exams[this.exam.id].exercises[this.exam.currentStep][this.exam.exerciseSelected];
		this.exam.path = {
			exercise: resolve(
				__dirname,
				(!this.exams[this.exam.id].custom)
					? 'data'
					: '',
				'exams',
				this.exams[this.exam.id].dirName,
				selectexercise.dir ?? '',
				selectexercise.id
			),
			subject: resolve(this.git.subject, selectexercise.id),
			correction: resolve(this.git.temp, this.generateId)
		};
		
		return new Promise((res, rej) => {
			try {
				rmSync(this.exam.path.correction, { recursive: true, force: true });
				mkdirSync(this.exam.path.subject);
				mkdirSync(this.exam.path.correction);
				copyFile(
					resolve(this.exam.path.exercise, 'subjects', this.options.lang as string),
					resolve(this.exam.path.subject, 'subject.txt')
				);
				if (selectexercise.copy && selectexercise.copy.user) {
					for (const el of selectexercise.copy.user) {
						glob.sync(resolve(this.exam.path.exercise, el)).forEach((file) => {
							copyDirSync(file, resolve(this.exam.path.subject, basename(file)));
						});
					}
				}
				this.timer.old = 1;
				this.timer.retry = 1;
				this.info();
				res();
			} catch (e: any) {
				rej(e);
			}
		});
	}

	private convertTime(secs: number): string {
		const __n = (n: number): string => (n < 9)
			? `0${n}`
			: String(n);
		const hours = Math.floor(secs / 3600);
		const minutes = Math.floor((secs - (hours * 3600)) / 60);
		const seconds = secs - (hours * 3600) - (minutes * 60);

		return `${__n(hours)}:${__n(minutes)}:${__n(seconds)}`;
	}

	grade(): Promise<void> {
		return new Promise((res) => {
			if (this.exam.goal.current >= this.exam.goal.max)
				return res();
			if (this.timer.retry > 0) {
				console.log(`${format.foreground.light.red}${i18n('grademe.time', this.options.lang)} ${format.foreground.light.blue}${this.convertTime(this.timer.retry)} ${format.format.reset}`);
				return res();
			}

			const spin = new spinner();
			spin.start(i18n('grademe.correction', this.options.lang) as string, 'bar');

			try {
				rmSync(this.exam.path.correction, { recursive: true, force: true });
				mkdirSync(this.exam.path.correction);
			} catch (e) {
				this.failed(spin, e).then(() => res()).catch(() => res());
			}

			exec(`git clone ${this.git.render}`, {
				cwd: this.exam.path.correction,
				shell: '/bin/bash',
				windowsHide: true,
				timeout: 20000
			}, (err, _stdout, stderr) => {
				if (err || (stderr.length && /warning: You appear to have cloned an empty repository/gm.test(stderr))) {
					this.failed(spin, (stderr.length)
						? stderr
						: `errno: ${err?.code}`, true).then(() => res()).catch(() => res());
				} else {
					this.testexercise()
						.then(() => {
							this.success(spin)
								.then(() => res())
								.catch(() => res());
						})
						.catch((e: { data: any, force?: boolean }) => {
							this.failed(spin, e.data, e.force)
								.then(() => res())
								.catch(() => res());
						});
				}
			});
		});
	}

	private async testexercise(): Promise<void> {
		return new Promise((res: () => void, rej: (e: { data: any, force?: boolean }) => void) => {
			const exercise = this.exams[this.exam.id].exercises[this.exam.currentStep][this.exam.exerciseSelected];
			const handleKillCommand = /^make.bash: +line +\d+: +\d+ Killed +.*$/m;

			try {
				copyFileSync(resolve(__dirname, 'data', 'shell', 'leaks.bash'), resolve(this.exam.path.correction, 'leaks.bash'));
				copyFileSync(resolve(this.exam.path.exercise, 'make.bash'), resolve(this.exam.path.correction, 'make.bash'));
				if (exercise.copy?.check) {
					for (const el of exercise.copy.check) {
						glob.sync(resolve(this.exam.path.exercise, el)).forEach((file) => {
							copyDirSync(file, resolve(this.exam.path.correction, basename(file)));
						});
					}
				}
			} catch (e: any) {
				rej({ data: e });
			}

			exec(`bash make.bash ${(i18n('git.render', this.options.lang))}`, {
				cwd: this.exam.path.correction,
				shell: '/bin/bash',
				windowsHide: true,
				timeout: 240000 // 4min
			}, (err, _stdout, stderr) => {
				if (err || stderr.length) {
					if (err?.code && err.code >= 100)
						return rej({ data: err });
					if (stderr.length) {
						const lines = stderr.split(/\n|\r\n/).filter((l) => l.length);
						while (lines.length) {
							if (!handleKillCommand.test(lines[0]))
								break;
							lines.shift();
						}
						if (lines.length)
							return rej({ data: stderr, force: true });
					} else
						return rej({ data: `errno: ${err?.code ?? 100}`, force: true });
				}
				readdirSync(
					resolve(this.exam.path.correction),
					{ encoding: 'utf-8', withFileTypes: true })
					.reduce((acc, curr) => {
						if (curr.isFile() && /^_{2}diff(?:_\d+)?$/.test(curr.name))
							return [...acc, resolve(this.exam.path.correction, curr.name)];
						return acc;
					}, [] as string[])
					.forEach((diffPath) => {
						const raw = readFileSync(diffPath, { encoding: 'utf-8', flag: 'r' });
						if (raw.length)
							return rej({ data: raw });
					});
				if (exercise.moulinette || Array.isArray(exercise.moulinette)) {
					const elements = {
						functs: (Object.prototype.hasOwnProperty.call(exercise, 'allowed_functions'))
							? exercise.allowed_functions
							: [],
						keys: (Object.prototype.hasOwnProperty.call(exercise, 'forbidden_keywords'))
							? exercise.forbidden_keywords
							: [],
					};
					const check = new checker(
						resolve(this.exam.path.correction, i18n('git.render', this.options.lang) as string, exercise.id),
						exercise.moulinette,
						elements.functs,
						elements.keys
					);
					const errors = check.check();
					if (errors.length)
						return rej({ data: JSON.stringify(errors, null, 2) });
				}
				if (exercise.leaks) {
					const ret = {
						leaks: [] as any[],
						fds: [] as any[],
					};
					const dirList = readdirSync(this.exam.path.correction, { encoding: 'utf-8', withFileTypes: false });
					dirList.forEach((file) => {
						if (/^valgrind_\d+.log/.test(file)) {
							const leaks = new valgrind(resolve(this.exam.path.correction, file));
							if (leaks.isLeaks())
								ret.leaks.push(leaks.leaks);
							if (leaks.isOpenFds())
								ret.fds.push(leaks.fds);
						}
					});
					if (ret.leaks.length > 0)
						return rej({ data: JSON.stringify(ret.leaks, null, 2) });
					if (ret.fds.length > 0)
						return rej({ data: JSON.stringify(ret.fds, null, 2) });
				}
				res();
			});
		});
	}

	private async failed(spin: spinner, data: any, forceTrace = false): Promise<void> {
		spin.stop();
		stdout.clearLine(0);
		++this.exam.retry;
		this.timer.old += this.timer.old * this.exams[this.exam.id].exercises[this.exam.currentStep][this.exam.exerciseSelected].exponent;
		this.timer.retry = this.timer.old;
		console.log(`${format.foreground.light.red}>>> ${(i18n('grademe.failed', this.options.lang) as string).toUpperCase()} <<<${format.format.reset}`);

		if (this.exams[this.exam.id].exercises[this.exam.currentStep][this.exam.exerciseSelected].trace || forceTrace) {
			const topString = `\n${format.foreground.normal.magenta}══ ${(i18n((forceTrace
				? 'grademe.error'
				: 'grademe.trace'), this.options.lang) as string).toUpperCase()} ═════════════════════════════${format.format.reset}`;
			const bottomString = () => {
				let ret = '';
				for (let i = 0; i < (topString.length - 10); i++)
					ret += '═';
				return ret;
			};
			console.log(topString);
			if (Array.isArray(data) && !forceTrace) {
				for (const el of data)
					console.log(basename(el.file), el.found);
			} else
				console.log(`${format.format.reset}${data}${format.format.reset}`);
			console.log(`\n${format.foreground.normal.magenta}${bottomString()}${format.format.reset}`);
		}

		if (this.options.doom) {
			await rm(this.git.render, { recursive: true, force: true });
			await mkdirPromise(this.git.render, { recursive: true });
			await copyFile(resolve(__dirname, 'data', 'shell', 'init.bash'), resolve(this.git.render, 'init.bash'));
			exec('bash init.bash', {
				cwd: this.git.render,
				shell: '/bin/bash',
				windowsHide: true,
				timeout: 150000
			}).on('exit', () => rmSync(resolve(this.git.render, 'init.bash'), { force: true }));
		}
		this.info();
		return;
	}

	private async success(spin: spinner): Promise<void> {
		spin.stop();
		stdout.clearLine(0);
		++this.exam.currentStep;
		this.exam.goal.current += this.exam.goal.add;
		console.log(`${format.foreground.light.green}>>> ${(i18n('grademe.success', this.options.lang) as string).toUpperCase()} <<<${format.format.reset}`);
		if (this.exam.goal.current >= this.exam.goal.max) {
			this.exam.goal.current = this.exam.goal.max;
			console.log(`${format.foreground.light.blue}${i18n('grademe.finish', this.options.lang) as string}${format.format.reset}`);
		} else
			await this.nextExercise();
		return;
	}
}
