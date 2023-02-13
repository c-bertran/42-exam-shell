import format from 'modules/format';
import i18n from 'langs/index';
import { command } from '../interface';

export default {
	name: 'help',
	description: {
		'en_US': 'See help',
		'fr_FR': 'Voir l\'aide'
	},
	exec: (command, lang) => {
		switch (command[1]) {
		case 'finish':
			console.log(`${format.foreground.light.blue}finish${format.format.reset} - ${i18n('help.finish', lang)}`);
			break;
		case 'grademe':
			console.log(`${format.foreground.light.blue}grademe${format.format.reset} - ${i18n('help.grademe', lang)}`);
			break;
		case 'help':
			console.log(`${format.foreground.light.blue}help${format.format.reset} - ${i18n('help.help', lang)} (${format.foreground.light.blue}help${format.format.reset} [command])`);
			break;
		case 'status':
			console.log(`${format.foreground.light.blue}status${format.format.reset} - ${i18n('help.status', lang)}`);
			break;
		default:
			console.log(`${format.foreground.light.blue}help${format.format.reset} - ${format.foreground.light.red}${command[1]}${format.format.reset} ${i18n('error.command', lang)}`);
		}
	}
} as command;
