import { mkdir, writeFile } from 'fs/promises';
import { cwd } from 'process';
import { resolve } from 'path';

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
	}
] as optionInterface[];

/**
 * Handle flag passed to exec
 */
export default (argv: string[]): void => {
	let i = 0;

	while (i < argv.length) {
		const conf = options.filter((e) => e.flags.includes(argv[i]));
		if (conf.length) {
			if (conf[0].nArguments) {
				conf[0].exec(argv.slice(i, i + conf[0].nArguments));
				i += conf[0].nArguments;
			} else
				conf[0].exec();
		}
		++i;
	}
};
