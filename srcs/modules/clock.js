/* eslint-disable no-param-reassign */

function timer(secs)
{
	const secNum = parseInt(secs, 10);
	let hours = Math.floor(secNum / 3600);
	let minutes = Math.floor((secNum - (hours * 3600)) / 60);
	let seconds = secNum - (hours * 3600) - (minutes * 60);

	if (hours < 10)
		hours = `0${hours}`;
	if (minutes < 10)
		minutes = `0${minutes}`;
	if (seconds < 10)
		seconds = `0${seconds}`;
	return `${hours}:${minutes}:${seconds}`;
}

function clock(secs)
{
	let Hours = 0;
	let Minutes = 0;
	if (secs >= 3600)
	{
		Hours = Math.round(secs / 3600);
		secs %= 3600;
	}
	if (secs >= 60)
	{
		Minutes = Math.round(secs / 60);
		secs %= 60;
	}
	secs = Math.round(secs);
	const Str = {
		Hours: (2 - Hours).toString(),
		Minutes: (60 - Minutes).toString(),
		Seconds: (60 - secs).toString(),
	};
	if (Str.Minutes === 60)
		Str.Minutes = 59;
	if (Str.Seconds === 60)
		Str.Seconds = 59;
	if (Str.Hours < 10)
		Str.Hours = `0${Str.Hours}`;
	if (Str.Minutes < 10)
		Str.Minutes = `0${Str.Minutes}`;
	if (Str.Seconds < 10)
		Str.Seconds = `0${Str.Seconds}`;
	return (`${Str.Hours}:${Str.Minutes}:${Str.Seconds}`);
}

// export { timer, clock };
module.exports = {
	timer,
	clock,
};
