import { exit } from 'process';
import exams from '@/exams';
import { command } from '../interface';

export default {
	name: 'finish',
	description: {
		'en_US': 'Terminate exam, pass -f to force program exit',
		'fr_FR': 'Termine l\'examen, passez -f pour forcer la sortie du programme',
	},
	exec: async (command, _lang, exam: exams) => {
		if (command.length > 1 && ['--force', '-f'].includes(command[1]))
			exit(0);
		if ((await exam.stop()) === 'restart')
			exam.emit('restart');
		else
			exit(0);
	}
} as command;
