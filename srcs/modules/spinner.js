const process = require('process');
const os = require('os');
const formats = require('./formats');

const spinners = {
	normal: [
		80,
		'⣷',
		'⣯',
		'⣟',
		'⡿',
		'⢿',
		'⣻',
		'⣽',
		'⣾',
	],
	bar: [
		80,
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
		'         ',
	],
	bounce: [
		80,
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
		'██       ',
	],
};

let saveInterval;
let string;
class Spinner
{
	static start(title = undefined, type = 'normal', color = formats.foreground.light.cyan)
	{
		string = title;
		process.stdout.write('\x1B[?25l');
		let index = 1;
		saveInterval = setInterval(() =>
		{
			process.stdout.write(formats.erase.cursorToStartLine);
			let line = spinners[type][index];
			if (line === undefined)
			{
				index = 1;
				line = spinners[type][index];
			}
			if (os.platform === 'win32')
				process.stdout.write(` ${color}${line} ${formats.format.reset}${(string !== undefined) ? string : ''}\x1b[0G`);
			else
				process.stdout.write(` ${color}${line} ${formats.format.reset}${(string !== undefined) ? string : ''}\r`);
			index = index >= spinners[type].length ? 1 : ++index;
		}, spinners[type][0]);
	}

	static update(newTitle)
	{
		process.stdout.write(formats.erase.cursorToEndLine);
		string = newTitle;
	}

	static stop()
	{
		clearInterval(saveInterval);
		process.stdout.write('\x1B[?25h');
	}
}

module.exports = Spinner;
