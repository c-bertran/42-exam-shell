import format from 'modules/format';
import clock from 'modules/clock';
import challenges from 'challenges/index';
import { command } from '../interface';

export default {
	name: 'status',
	description: {
		'en_US': 'Print status of current challenge',
		'fr_FR': 'Imprimer le statut du challenge en cours'
	},
	exec: async (_command, _lang, challenge: challenges, clock: clock) => {
		challenge.info();
		if (!clock.isInfinite) {
			console.log('╓───────────────────╖');
			console.log('║        ⏰         ║');
			console.log(`║      ${format.foreground.normal.green}${clock.time.days.toString().padStart(2, '0')}${format.format.reset} days      ║`);
			console.log(`║    ${format.foreground.normal.cyan}${clock.time.hours.toString().padStart(2, '0')}${format.format.reset}h ${format.foreground.normal.cyan}${clock.time.minutes.toString().padStart(2, '0')}${format.format.reset}m ${format.foreground.normal.cyan}${clock.time.seconds.toString().padStart(2, '0')}${format.format.reset}s    ║`);
			console.log('╙───────────────────╜\n');
		} else {
			console.log('╓───────────────────╖');
			console.log('║        ⏰         ║');
			console.log('║        ♾          ║');
			console.log('╙───────────────────╜\n');
		}
	}
} as command;
