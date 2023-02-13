import exams from '@/exams';
import { exit } from 'process';
import { command } from '../interface';

export default {
	name: 'finish',
	description: {
		'en_US': 'Terminate exam and leaves the program',
		'fr_FR': 'Termine l\'examen et quitte le programme'
	},
	exec: async (_command, _lang, exam: exams) => {
		await exam.stop();
		exit(0);
	}
} as command;
