import exams from 'exams/index';
import { command } from '../interface';

export default {
	name: 'grademe',
	description: {
		'en_US': 'Grade current exercise',
		'fr_FR': 'Noter l\'exercice en cours'
	},
	exec: async (_command, _lang, exams: exams) => {
		return new Promise((res) => {
			exams.grade()
				.then(() => res())
				.catch(() => res());
		});
	}
} as command;
