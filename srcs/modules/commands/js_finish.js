const fs = require('fs');
const process = require('process');

module.exports = {
	name: 'finish',
	description: 'Terminates the exam and leaves the program',
	exec: (JSON) =>
	{
		fs.rm(JSON.git.temp, { recursive: true, force: true }, (err) =>
		{
			// Callback present is here for rimraf error if no callback provided
			if (err)
				;
		});
		process.exit(0);
	},
};
