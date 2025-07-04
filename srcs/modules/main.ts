import { exit, stdin, stdout } from 'process';
import { createInterface } from 'readline';
import prompts from 'prompts';
import commands, { initCommands, getCommandsList } from 'commands/index';
import challenges from 'challenges/index';
import challengeList from 'challenges/challenges';
import i18n, { lang, langList } from 'langs/index';
import clock from 'modules/clock';
import format from 'modules/format';
import type { Interface } from 'readline';
import customChallengeList, { getConfig } from './customChallengeList';
import error from './error';

export default class {
	public options: {
		infinite: boolean,
		doom: boolean,
		lang: lang
	};
	public challengeInstance: undefined | challenges;
	public clockInstance: undefined | clock;
	public prompt: undefined | Interface;

	constructor() {
		this.options = {
			infinite: false,
			doom: false,
			lang: 'en_US'
		};
		this.challengeInstance = undefined;
		this.clockInstance = undefined;

		if (getConfig().signature)
			console.log('\n CodeShell\nby cbertran (https://github.com/c-bertran/codeshell)\n');
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

	async restart(): Promise<void> {
		this.clockInstance?.stop();
		this.prompt?.close();
		stdout.write('\n');

		this.challengeInstance = undefined;
		this.clockInstance = undefined;
		this.prompt = undefined;

		await this.setChallenge();
		await this.startChallenge();
		this.manageClock();
		this.startPrompt();
	}

	setChallenge(): Promise<void> {
		return new Promise((res, rej) => {
			const __challenges = [...challengeList, ...customChallengeList()];
			if (getConfig().challenge) {
				for (const challenge of __challenges) {
					if (challenge.id === getConfig().challenge) {
						this.challengeInstance = new challenges(getConfig().challenge as string, this.options);
						this.clockInstance = new clock(challenge.time, this.options.infinite);
						this.challengeInstance.init();
						this.challengeInstance.prependOnceListener('restart', () => this.restart());
						return res();
					}
				}
				error(30, { exit: true });
				return rej();
			}
			prompts([
				{
					type: 'autocomplete',
					name: 'challenge',
					message: i18n('select.question', this.options.lang) as string,
					choices: __challenges.map((e) => ({ title: e.name[this.options.lang], value: e.id }))
				}
			], {
				onCancel: () => {
					error(20, { data: i18n('select.error', this.options.lang) as string });
					rej('prompt_stop');
				}
			})
				.then((answer) => {
					for (const challenge of __challenges) {
						if (challenge.id === answer.challenge) {
							this.challengeInstance = new challenges(answer.challenge, this.options);
							this.clockInstance = new clock(challenge.time, this.options.infinite);
							this.challengeInstance.init();
							this.challengeInstance.prependOnceListener('restart', () => this.restart());
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

	async startChallenge(): Promise<void> {
		return this.challengeInstance?.start()
			.then(() => {
				console.log(`\n${format.foreground.light.blue}${i18n('info.dir', this.options.lang)} '${format.foreground.normal.green}${this.challengeInstance?.git.main}${format.format.reset}'`);
				console.log(`${format.foreground.light.blue}${i18n('info.git', this.options.lang)}${format.format.reset}\n`);
				this.challengeInstance?.nextExercise();
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
			prompt: `${format.format.bold}${format.foreground.light.green}codeshell ${format.foreground.light.magenta}>${format.format.reset} `,
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
					this.challengeInstance as challenges,
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
