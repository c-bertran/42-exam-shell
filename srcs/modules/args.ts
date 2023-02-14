import { mkdir, writeFile } from 'fs/promises';
import { cwd, exit } from 'process';
import { resolve } from 'path';
import prompts from 'prompts';
import error from './error';

interface optionInterface {
	flags: string[],
	nArguments?: number,
	exec: (args?: unknown[]) => Promise<void>;
}

const options = [
	{
		flags: ['--custom', '-C'],
		nArguments: 0,
		exec: async () => {
			try {
				await mkdir(resolve(cwd(), 'exams'), { recursive: true });
				await writeFile(
					resolve(cwd(), 'exams', 'config.json'),
					JSON.stringify({
						checkUpdate: true,
						checkLib: true,
						signature: true,
						exam: null,
						lang: null,
						options: {
							doom: null,
							infinite: null
						}
					}, null, 2),
					{ encoding: 'utf-8', flag: 'wx' }
				);
			} catch {
				// file exist, don't overwrite
			}
		}
	},
	{
		flags: ['--new', '-N'],
		nArguments: 0,
		exec: async () => {
			const isAlphaNumUnder = (s: string) => {
				if (!/^[0-9a-z_]+$/m.test(s))
					return 'Accepts alphanumeric and underscore';
				return true;
			};
			const isTime = (s: string) => {
				if (!/^(?:([ \t]+)?[0-9]{1,2}[dhms](?:[ \t]+)?)+$/m.test(s))
					return 'Accept days `d`, hours `h`, minutes `m`, seconds `s` (`3d 14h 41m 17s`)';
				return true;
			};

			await prompts([
				{
					type: 'text',
					name: 'id',
					message: 'Enter id of exam',
					validate: isAlphaNumUnder
				},
				{
					type: 'text',
					name: 'dirName',
					message: 'Name of the folder containing your exam',
					validate: isAlphaNumUnder
				},
				{
					type: 'text',
					name: 'name',
					message: 'Name of your exam'
				},
				{
					type: 'number',
					name: 'goal',
					message: 'Number of points the user must reach to pass the exam',
					initial: 100,
					min: 0
				},
				{
					type: 'text',
					name: 'time',
					message: 'time you want to give the user to complete your exam. Accept days `d`, hours `h`, minutes `m`, seconds `s` (3d 14h 41m 17s)',
					initial: '3h',
					validate: isTime
				},
				{
					type: 'number',
					name: 'exercises',
					message: 'Number of exercises',
					initial: 1,
					min: 1
				}
			])
				.then(async (answer) => {
					const arr = (n: number) => {
						const ret = [];
						for (let i = 0; i < n; i++) {
							if (i === 0) {
								ret.push([{
									id: 'hello',
									name: {
										'en_US': 'hello'
									},
									exponent: n,
									moulinette: true,
									leaks: true,
									trace: true,
									allowed_functions: ['write'],
									copy: {
										check: ['hello.c']
									}
								}]);
							} else
								ret.push([]);
						}
						return ret;
					};

					await mkdir(resolve(cwd(), 'exams', answer.dirName), { recursive: true });
					await writeFile(resolve(cwd(), 'exams', answer.dirName, 'definition.json'), JSON.stringify({
						id: answer.id,
						dirName: answer.dirName,
						name: {
							en_US: answer.name,
							fr_FR: answer.name
						},
						goal: answer.goal,
						time: answer.time,
						exercises: arr(answer.exercises)
					}, null, 2), { flag: 'w' });
					await mkdir(resolve(cwd(), 'exams', answer.dirName, 'hello'));
					await mkdir(resolve(cwd(), 'exams', answer.dirName, 'hello', 'subjects'));
					await writeFile(resolve(cwd(), 'exams', answer.dirName, 'hello', 'subjects', 'en_US'), '', { encoding: 'utf-8' });
					await writeFile(resolve(cwd(), 'exams', answer.dirName, 'hello', 'make.bash'), '#!/bin/bash\n\nclang -Wall -Werror -Wextra hello.c -o hello\n', { encoding: 'utf-8' });
					await writeFile(resolve(cwd(), 'exams', answer.dirName, 'hello', 'hello.c'), '#include <stdio.h>\n\nint main(void) {\n\tprintf("hello world\\n");\n\treturn 0;\n}\n', { encoding: 'utf-8' });
					console.log(`🚀 Your exam is located at ${resolve(cwd(), 'exams', answer.dirName)} 🚀`);
					exit(0);
				})
				.catch((e) => {
					if (e.isTtyError)
						error(5, { exit: true });
					else
						console.error(e.message);
					exit(127);
				});
		}
	}
] as optionInterface[];

/**
 * Handle flag passed to exec
 */
export default async (argv: string[]): Promise<void> => {
	let i = 0;

	while (i < argv.length) {
		const conf = options.filter((e) => e.flags.includes(argv[i]));
		if (conf.length) {
			if (conf[0].nArguments) {
				await conf[0].exec(argv.slice(i, i + conf[0].nArguments));
				i += conf[0].nArguments;
			} else
				await conf[0].exec();
		}
		++i;
	}
};
