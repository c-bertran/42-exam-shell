import { exit } from 'process';
import challenges from '@/challenges';
import { command } from '../interface';

export default {
	name: 'finish',
	description: {
		'en_US': 'Terminate challenge, pass -f to force program exit',
		'fr_FR': 'Termine le challenge, passez -f pour forcer la sortie du programme',
	},
	exec: async (command, _lang, challenge: challenges) => {
		if (command.length > 1 && ['--force', '-f'].includes(command[1]))
			exit(0);
		if ((await challenge.stop()) === 'restart')
			challenge.emit('restart');
		else
			exit(0);
	}
} as command;
