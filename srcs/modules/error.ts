import { exit } from 'process';

const list: Record<number, string> = {
	1: 'Unsupported plateform, please use linux or darwin',
	2: 'Necessary librarie(s) not found',
	3: 'The prompt was cancelled. Please install `git`, `clang` and `valgrind` manually, or restart this application for retry',
	4: 'User password is incorrect',
	5: 'Prompt couldn\'t be rendered in the current environment',
	6: 'An error has occurred, the update search is skipped',

	10: 'Custom exam error',
	11: 'Config exam error',

	20: 'Prompt error',

	30: 'Exam with this identifier does not exist',
	31: 'Deletion of the folder has failed',
	32: 'mkdirSync or copyFileSync failed',

	40: 'Checker failed'
};

export let lastErrorCode: number;
export default (code: number, options?: { exit?: boolean, data?: string }): void => {
	lastErrorCode = code;
	console.error(`[Error ${code}] ${list[code] ?? undefined} ${options?.data}`);
	if (options?.exit)
		exit(code);
};
