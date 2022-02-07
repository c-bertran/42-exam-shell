const COLORS = require('../colors');

class status
{
	static exec(json, TIME, GRADE)
	{
		GRADE.print_info();
		if (!json.options.infinite)
		{
			console.log('╓───────────────────╖');
			console.log('║        ⏰         ║');
			console.log(`║      ${COLORS.green}${TIME.days.toString().padStart(2, 0)}${COLORS.reset} days      ║`);
			console.log(`║    ${COLORS.cyan}${TIME.hours.toString().padStart(2, 0)}${COLORS.reset}h ${COLORS.cyan}${TIME.minutes.toString().padStart(2, 0)}${COLORS.reset}m ${COLORS.cyan}${TIME.seconds.toString().padStart(2, 0)}${COLORS.reset}s    ║`);
			console.log('╙───────────────────╜\n');
		}
		else
		{
			console.log('╓───────────────────╖');
			console.log('║        ⏰         ║');
			console.log('║        ♾          ║');
			console.log('╙───────────────────╜\n');
		}
	}
}

module.exports = status;
