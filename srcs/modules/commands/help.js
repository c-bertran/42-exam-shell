const COLORS = require('../colors');

class help
{
	static exec(args, LANG)
	{
		const command = args[1];
		switch (command)
		{
			case 'status':
				console.log(`${COLORS.bluelight}status ${COLORS.reset}${LANG.Help.status}`);
				break;
			case 'grademe':
				console.log(`${COLORS.bluelight}grademe ${COLORS.reset}${LANG.Help.grademe}`);
				break;
			case 'finish':
				console.log(`${COLORS.bluelight}finish ${COLORS.reset}${LANG.Help.finish}`);
				break;
			case 'help':
			default:
				console.log(`${COLORS.bluelight}help ${COLORS.reset}${LANG.Help.help} (${COLORS.bluelight}help${COLORS.reset} [command])`);
		}
	}
}

module.exports = help;
