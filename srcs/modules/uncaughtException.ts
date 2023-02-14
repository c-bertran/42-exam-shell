import { readFileSync } from 'fs';
import { arch, platform, totalmem, version } from 'os';
import { resolve } from 'path';
import { exit, memoryUsage } from 'process';
import format from './format';

export default (err: Error): void => {
	const currentDate = (new Date()).toUTCString();

	console.error(`An error at ${currentDate} has occurred.\nDon't hesitate to open an issue on GitHub (https://github.com/c-bertran/42-exam-shell/issues) with the error below :`);

	console.error(`${format.foreground.normal.red}═══════════════ ${format.foreground.normal.yellow}⚠${format.format.reset}  Error ${format.foreground.normal.yellow}⚠${format.format.reset}  ${format.foreground.normal.red}══════════════${format.format.reset}`);

	console.error(`${format.foreground.normal.magenta}══ Info    ═════════════════════════════${format.format.reset}`);
	console.error(`Version      : ${JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json'), { encoding: 'utf-8' })).version}`);
	console.error(`UTC date     : ${currentDate}`);
	console.error(`Plateform    : ${platform()} (${arch()}) - ${version()}`);
	console.error(`Heap usage   : ${((memoryUsage().heapTotal * 8) / (8 * 1000 * 1000)).toPrecision(2)}MB`);
	console.error(`Total memory : ${((totalmem() * 8) / (8 * 1000 * 1000 * 1000)).toPrecision(2)}GB`);

	console.error(`\n${format.foreground.normal.magenta}══ Message ═════════════════════════════${format.format.reset}`);
	console.error(err.message);

	console.error(`\n${format.foreground.normal.magenta}══ Stack   ═════════════════════════════${format.format.reset}`);
	console.error(err.stack);

	console.error(`${format.foreground.normal.red}══════════════════════════════════════════${format.format.reset}`);
	exit(127);
};
