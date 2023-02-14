import { exit, stdin, stdout } from 'process';
import { createInterface } from 'readline';
import prompts from 'prompts';
import commands, { initCommands, getCommandsList } from 'commands/index';
import exams from 'exams/index';
import examList from 'exams/exams';
import i18n, { lang, langList } from 'langs/index';
import clock from 'modules/clock';
import format from 'modules/format';
import type { Interface } from 'readline';
import customExamList, { getConfig } from './customExamList';
import error from './error';

export default class {
	private punchline: string[];
	public options: {
		infinite: boolean,
		doom: boolean,
		lang: lang
	};
	public examInstance: undefined | exams;
	public clockInstance: undefined | clock;
	public prompt: undefined | Interface;

	constructor() {
		this.punchline = [
			'I\'m too young to die',
			'Hey, not too rough',
			'Hurt me plenty',
			'Ultra-violence',
			'Nightmare',
		];
		this.options = {
			infinite: false,
			doom: false,
			lang: 'en_US'
		};
		this.examInstance = undefined;
		this.clockInstance = undefined;

		if (getConfig().signature)
			console.log('\n███████╗██╗  ██╗ █████╗ ███╗   ███╗███████╗██╗  ██╗███████╗██╗     ██╗\n██╔════╝╚██╗██╔╝██╔══██╗████╗ ████║██╔════╝██║  ██║██╔════╝██║     ██║\n█████╗   ╚███╔╝ ███████║██╔████╔██║███████╗███████║█████╗  ██║     ██║\n██╔══╝   ██╔██╗ ██╔══██║██║╚██╔╝██║╚════██║██╔══██║██╔══╝  ██║     ██║\n███████╗██╔╝ ██╗██║  ██║██║ ╚═╝ ██║███████║██║  ██║███████╗███████╗███████╗\n╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝\nby cbertran (cbertran@student.42.fr)\n');
	}

	setLang(): Promise<void> {
		return new Promise((res, rej) => {
			if (getConfig().lang) {
				this.options.lang = getConfig().lang as lang;
				return res();
			}
			const langArr: { title: string, value: string }[] = [];
			for (const key in langList) {
				if (Object.prototype.hasOwnProperty.call(langList, key))
					langArr.push({ title: langList[key as lang], value: key });
			}
			prompts({
				type: 'select',
				name: 'lang',
				message: 'Select your language',
				choices: langArr,
				initial: 0
			})
				.then((d) => {
					this.options.lang = d.lang as lang ?? 'en_US';
					res();
				})
				.catch((e) => {
					if (e.isTtyError)
						error(5, { exit: true });
					else
						console.error(e.message);
					rej('prompt_error');
				});
		});
	}

	setOptions(): Promise<void> {
		return new Promise((res, rej) => {
			if (getConfig().optionsIsSet) {
				this.options.doom = getConfig().options.doom ?? false;
				this.options.infinite = getConfig().options.infinite ?? false;
				return res();
			}
			prompts([
				{
					type: 'multiselect',
					name: 'options',
					message: i18n('options.question', this.options.lang) as string,
					choices: [
						{
							title: ` ${i18n('options.infinite.title', this.options.lang)} > ${i18n('options.infinite.description', this.options.lang)}`,
							value: '--infinite',
						},
						{
							title: ` ${i18n('options.doom.title', this.options.lang)} > ${i18n('options.doom.description', this.options.lang)}`,
							value: '--doom',
						},
					]
				},
			], {
				onCancel: () => {
					error(20, { data: i18n('select.error', this.options.lang) as string });
					rej('prompt_stop');
				}
			})
				.then((answer) => {
					if (answer.options.length && answer.options.indexOf('--infinite') !== -1)
						this.options.infinite = true;
					if (answer.options.length &&  answer.options.indexOf('--doom') !== -1)
						this.options.doom = true;
					res();
				})
				.catch((e) => {
					if (e.isTtyError)
						error(5, { exit: true });
					else
						console.error(e.message);
					rej('prompt_error');
				});
		});
	}

	setExam(): Promise<void> {
		return new Promise((res, rej) => {
			const __exams = [...examList, ...customExamList()];
			if (getConfig().exam) {
				for (const exam of __exams) {
					if (exam.id === getConfig().exam) {
						this.examInstance = new exams(getConfig().exam as string, this.options);
						this.clockInstance = new clock(exam.time, this.options.infinite);
						this.examInstance.init();
						return res();
					}
				}
				error(30, { exit: true });
				return rej();
			}
			prompts([
				{
					type: 'autocomplete',
					name: 'exam',
					message: i18n('select.question', this.options.lang) as string,
					choices: __exams.map((e) => ({ title: e.name[this.options.lang], value: e.id }))
				}
			], {
				onCancel: () => {
					error(20, { data: i18n('select.error', this.options.lang) as string });
					rej('prompt_stop');
				}
			})
				.then((answer) => {
					for (const exam of __exams) {
						if (exam.id === answer.exam) {
							this.examInstance = new exams(answer.exam, this.options);
							this.clockInstance = new clock(exam.time, this.options.infinite);
							this.examInstance.init();
							break;
						}
					}
					res();
				})
				.catch((e) => {
					if (e.isTtyError)
						error(5, { exit: true });
					else
						console.error(e.message);
					rej('prompt_error');
				});
		});
	}

	async startExamen(): Promise<void> {
		return this.examInstance?.start()
			.then(() => {
				console.log(`\n${format.foreground.light.blue}${i18n('info.dir', this.options.lang)} '${format.foreground.normal.green}${this.examInstance?.git.main}${format.format.reset}'`);
				console.log(`${format.foreground.light.blue}${i18n('info.git', this.options.lang)}${format.format.reset}\n`);
				this.examInstance?.nextExercise();
			})
			.catch((e) => {
				console.error(e);
				exit(127);
			});
	}

	manageClock(): void {
		if (this.options.infinite)
			return;
		this.clockInstance?.start();
		this.clockInstance?.on('stop', () => {
			this.prompt?.write(null, { ctrl: true, name: 'u' });
			this.prompt?.write(this.punchline[Math.floor(Math.random() * this.punchline.length)]);
			this.prompt?.write(null, { name: 'enter' });
		});
	}

	startPrompt(): void {
		const stopPrompt = () => {
			stdout.write('\n');
			exit(0);
		};

		initCommands();
		this.prompt = createInterface({
			input: stdin,
			output: stdout,
			prompt: `${format.format.bold}${format.foreground.light.green}examshell ${format.foreground.light.magenta}>${format.format.reset} `,
			terminal: true,
			tabSize: 2,
			completer: (line: string) => {
				const hits = getCommandsList().filter((c) => c.startsWith(line));
				return [hits.length
					? hits
					: getCommandsList(), line];
			},
		})
			.on('line', async (line: string) => {
				this.prompt?.pause();
				await commands(
					line,
					this.options.lang,
					this.examInstance as exams,
					this.clockInstance as clock
				);
				this.prompt?.resume();
				this.prompt?.prompt();
			})
			.on('SIGINT', () => {
				stdout.write('\n');
				this.prompt?.write(null, { ctrl: true, name: 'u' });
				this.prompt?.prompt();
			})
			.on('SIGCONT', () => stopPrompt())
			.on('SIGTSTP', () => stopPrompt());
		this.prompt.prompt();
	}
}
