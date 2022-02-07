/* eslint-disable no-param-reassign */

function timer(TIME)
{
	if (TIME.days === 0 && TIME.hours === 0 && TIME.minutes === 0 && TIME.seconds === 0)
		return;
	--TIME.seconds;
	if (TIME.seconds < 0)
	{
		--TIME.minutes;
		TIME.seconds = 59;
	}
	if (TIME.minutes < 0)
	{
		--TIME.hours;
		TIME.minutes = 59;
	}
	if (TIME.hours < 0)
	{
		--TIME.days;
		TIME.hours = 23;
	}
	if (TIME.hours === -1)
	{
		TIME.seconds = 0;
		TIME.minutes = 0;
		TIME.hours = 0;
		TIME.days = 0;
	}
}

function secondsToClock(secs)
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

module.exports = {
	timer,
	secondsToClock,
};
