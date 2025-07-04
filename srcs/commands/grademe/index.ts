import challenges from 'challenges/index';
import { command } from '../interface';

export default {
	name: 'grademe',
	description: {
		'en_US': 'Grade current exercise',
		'fr_FR': 'Noter l\'exercice en cours'
	},
	exec: async (_command, _lang, challenges: challenges) => {
		return new Promise((res) => {
			challenges.grade()
				.then(() => res())
				.catch(() => res());
		});
	}
} as command;
