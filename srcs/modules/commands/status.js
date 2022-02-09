const formats = require('../formats');

class status
{
	static exec(json, TIME, GRADE)
	{
		GRADE.print_info();
		if (!json.options.infinite)
		{
			console.log('╓───────────────────╖');
			console.log('║        ⏰         ║');
			console.log(`║      ${formats.foreground.normal.green}${TIME.days.toString().padStart(2, 0)}${formats.format.reset} days      ║`);
			console.log(`║    ${formats.foreground.normal.cyan}${TIME.hours.toString().padStart(2, 0)}${formats.format.reset}h ${formats.foreground.normal.cyan}${TIME.minutes.toString().padStart(2, 0)}${formats.format.reset}m ${formats.foreground.normal.cyan}${TIME.seconds.toString().padStart(2, 0)}${formats.format.reset}s    ║`);
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
