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

/**
 * Transform string time to real time
 * Accept days `d`, hours `h`, minutes `m`, seconds `s`
 * Exemple: `3d 14h 41m 17s`
 * @param {String} time String containing time information
 * @returns {Object} Time parsed in array
 */
const convertTime = (time) =>
{
	const regex = /(?<days>\d*)d|(?<hours>\d*)h|(?<minutes>\d*)m|(?<seconds>\d*)s/gm;
	const ret = {
		days: Number(0),
		hours: Number(0),
		minutes: Number(0),
		seconds: Number(0),
		time: Number(0),
	};

	const match = Array.from(time.matchAll(regex), (m) => (
		{
			days: Number(m.groups.days),
			hours: Number(m.groups.hours),
			minutes: Number(m.groups.minutes),
			seconds: Number(m.groups.seconds),
		}
	));
	for (const obj of match)
	{
		if (!Number.isNaN(obj.days))
			ret.days += obj.days;
		if (!Number.isNaN(obj.hours))
			ret.hours += obj.hours;
		if (!Number.isNaN(obj.minutes))
			ret.minutes += obj.minutes;
		if (!Number.isNaN(obj.seconds))
			ret.seconds += obj.seconds;
	}
	ret.time += ret.days * 86400;
	ret.time += ret.hours * 3600;
	ret.time += ret.minutes * 60;
	ret.time += ret.seconds;
	return ret;
};

module.exports = {
	timer,
	secondsToClock,
	convertTime,
};
