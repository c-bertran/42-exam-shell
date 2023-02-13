import { stdout } from 'process';
import { platform } from 'os';
import format from './format';

type spinnerName = 'normal' | 'bar' | 'bounce';

interface spinners {
	name: spinnerName,
	time: number,
	els: string[]
}

export default class {
	public saveInterval: undefined | NodeJS.Timer;
	public string: undefined | string;
	private spinners: spinners[];

	constructor() {
		this.saveInterval = undefined;
		this.string = undefined;
		this.spinners = [
			{
				name: 'normal',
				time: 80,
				els: ['⣷', '⣯', '⣟', '⡿', '⢿', '⣻', '⣽', '⣾']
			},
			{
				name: 'bar',
				time: 80,
				els: [
					'█        ',
					'██       ',
					'███      ',
					'████     ',
					'█████    ',
					' █████   ',
					'  █████  ',
					'   █████ ',
					'    █████',
					'     ████',
					'      ███',
					'       ██',
					'        █',
					'         '
				]
			},
			{
				name: 'bounce',
				time: 80,
				els: [
					'█        ',
					'██       ',
					' ██      ',
					'  ██     ',
					'   ██    ',
					'    ██   ',
					'     ██  ',
					'      ██ ',
					'       ██',
					'        █',
					'       ██',
					'      ██ ',
					'     ██  ',
					'    ██   ',
					'   ██    ',
					'  ██     ',
					' ██      ',
					'██       '
				]
			}
		];
	}

	start(
		title: string | undefined = undefined,
		type: spinnerName = 'normal',
		color = format.foreground.light.cyan
	): void {
		const id = this.spinners.findIndex((e) => e.name === type);

		this.string = title;
		stdout.write('\x1B[?25l');
		let index = 1;
		this.saveInterval = setInterval(() => {
			stdout.write(format.erase.cursorToStartLine);
			let line = this.spinners[id].els[index];
			if (line === undefined) {
				index = 0;
				line = this.spinners[id].els[index];
			}
			if (platform() === 'win32') {
				stdout.write(` ${color}${line} ${format.format.reset}${(this.string !== undefined)
					? this.string
					: ''}\x1b[0G`);
			} else {
				stdout.write(` ${color}${line} ${format.format.reset}${(this.string  !== undefined)
					? this.string
					: ''}\r`);
			}
			index = (index >= this.spinners[id].els.length)
				? 0
				: ++index;
		}, this.spinners[id].time);
	}

	update(newTitle: undefined | string = undefined): void {
		stdout.write(format.erase.cursorToEndLine);
		this.string = newTitle;
	}

	stop(): void {
		clearInterval(this.saveInterval);
		stdout.write('\x1B[?25h');
	}
}
