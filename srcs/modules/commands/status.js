// import { clock } from '../clock.js';
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

// export default status;
module.exports = status;
