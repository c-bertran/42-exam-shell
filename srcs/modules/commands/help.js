const formats = require('../formats');

module.exports = {
	name: 'help',
	description: 'Print help',
	exec: (commands, _JSON, LANG) =>
	{
		switch (commands[1])
		{
			case 'status':
				console.log(`${formats.foreground.light.blue}status${formats.format.reset} - ${LANG.Help.status}`);
				break;
			case 'grademe':
				console.log(`${formats.foreground.light.blue}grademe${formats.format.reset} - ${LANG.Help.grademe}`);
				break;
			case 'finish':
				console.log(`${formats.foreground.light.blue}finish${formats.format.reset} - ${LANG.Help.finish}`);
				break;
			case 'help':
			case undefined:
				console.log(`${formats.foreground.light.blue}help${formats.format.reset} - ${LANG.Help.help} (${formats.foreground.light.blue}help${formats.format.reset} [command])`);
				break;
			default:
				console.log(`${formats.foreground.light.blue}help ${formats.format.reset} - ${formats.foreground.light.red}${commands[1]}${formats.format.reset} ${LANG.Errors.Command}`);
		}
	},
};
