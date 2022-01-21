const { clock } = require('../clock');

class status
{
	static exec(json, timer)
	{
		if (!json.options.infinite)
			console.log(`${clock(timer.start)}`);
		else
			console.log('∞');
	}
}

module.exports = status;
