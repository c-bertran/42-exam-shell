import { platform } from 'os';

export default {
	format: {
		reset: '\x1b[0m',
		bold: '\x1b[1m',
		faint: '\x1b[2m',
		italic: '\x1b[3m',
		underline: '\x1b[4m',
		blinking: '\x1b[5m',
		inverse: '\x1b[7m',
		hidden: '\x1b[8m',
		strikethrough: '\x1b[9m',
	},
	erase: {
		cursorToEndScreen: '\x1b[0J',
		cursorToStartScreen: '\x1b[1J',
		erase: (platform() === 'win32')
			? '\x1b[0G'
			: '\r',
		screen: '\x1b[2J',
		save: '\x1b[3J',
		cursorToEndLine: '\x1b[0K',
		cursorToStartLine: '\x1b[1K',
		line: '\x1b[2K',
	},
	background: {
		normal: {
			black: '\x1b[40m',
			red: '\x1b[41m',
			green: '\x1b[42m',
			yellow: '\x1b[43m',
			blue: '\x1b[44m',
			magenta: '\x1b[45m',
			cyan: '\x1b[46m',
			gray: '\x1b[47m',
		},
		light: {
			black: '\x1b[100m',
			red: '\x1b[101m',
			green: '\x1b[102m',
			yellow: '\x1b[103m',
			blue: '\x1b[104m',
			magenta: '\x1b[105m',
			cyan: '\x1b[106m',
			gray: '\x1b[107m',
		},
	},
	foreground: {
		normal: {
			black: '\x1b[30m',
			red: '\x1b[31m',
			green: '\x1b[32m',
			yellow: '\x1b[33m',
			blue: '\x1b[34m',
			magenta: '\x1b[35m',
			cyan: '\x1b[36m',
			gray: '\x1b[37m',
		},
		light: {
			black: '\x1b[90m',
			red: '\x1b[91m',
			green: '\x1b[92m',
			yellow: '\x1b[93m',
			blue: '\x1b[94m',
			magenta: '\x1b[95m',
			cyan: '\x1b[96m',
			gray: '\x1b[97m',
		},
	},
};
