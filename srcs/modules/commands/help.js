const formats = require('../formats');

class help
{
	static exec(args, LANG)
	{
		const command = args[1];
		switch (command)
		{
			case 'status':
				console.log(`${formats.foreground.light.blue}status ${formats.format.reset}${LANG.Help.status}`);
				break;
			case 'grademe':
				console.log(`${formats.foreground.light.blue}grademe ${formats.format.reset}${LANG.Help.grademe}`);
				break;
			case 'finish':
				console.log(`${formats.foreground.light.blue}finish ${formats.format.reset}${LANG.Help.finish}`);
				break;
			case 'help':
			default:
				console.log(`${formats.foreground.light.blue}help ${formats.format.reset}${LANG.Help.help} (${formats.foreground.light.blue}help${formats.format.reset} [command])`);
		}
	}
}

module.exports = help;
