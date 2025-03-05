import EventEmitter from 'events';

interface time {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	total: number;
}

export default class extends EventEmitter {
	public time: time;
	public isInfinite: boolean;
	private interval: undefined | NodeJS.Timer;

	/**
	 * Transform string time to real time
	 * Accept days `d`, hours `h`, minutes `m`, seconds `s`
	 * Exemple: `3d 14h 41m 17s`
	 * @param {time} time String containing time information
	 */
	constructor(time: string, isInfinite: boolean) {
		super();
		const reg = /(?<days>\d*)d|(?<hours>\d*)h|(?<minutes>\d*)m|(?<seconds>\d*)s/gm;
		const matchs = Array.from(time.matchAll(reg), (m) => (
			{
				days: Number(m.groups?.days),
				hours: Number(m.groups?.hours),
				minutes: Number(m.groups?.minutes),
				seconds: Number(m.groups?.seconds),
			}
		));
		
		this.time = { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
		this.isInfinite = isInfinite;
		this.interval = undefined;
		for (const obj of matchs) {
			if (!Number.isNaN(obj.days))
				this.time.days += obj.days;
			if (!Number.isNaN(obj.hours))
				this.time.hours += obj.hours;
			if (!Number.isNaN(obj.minutes))
				this.time.minutes += obj.minutes;
			if (!Number.isNaN(obj.seconds))
				this.time.seconds += obj.seconds;
		}

		this.time.total += this.time.days * 86400;
		this.time.total += this.time.hours * 3600;
		this.time.total += this.time.minutes * 60;
		this.time.total += this.time.seconds;
	}

	private __formatTime(n: number): string {
		return (n < 9)
			? `0${n}`
			: String(n);
	}

	public start(): void {
		if (this.interval)
			return;
		this.interval = setInterval(() => {
			if (this.time.days === 0
				&& this.time.hours === 0
				&& this.time.minutes === 0
				&& this.time.seconds === 0
			)
				return this.stop();
			--this.time.seconds;
			if (this.time.seconds < 0) {
				--this.time.minutes;
				this.time.seconds = 59;
			}
			if (this.time.minutes < 0) {
				--this.time.hours;
				this.time.minutes = 59;
			}
			if (this.time.hours < 0) {
				--this.time.days;
				this.time.hours = 23;
			}
			if (this.time.hours === -1) {
				this.time.seconds = 0;
				this.time.minutes = 0;
				this.time.hours = 0;
				this.time.days = 0;
			}
		}, 1000);
		this.emit('start');
	}

	public stop(): void {
		if (!this.interval)
			return;
		clearInterval(this.interval as NodeJS.Timeout);
		this.emit('stop');
	}

	public isFinish(): boolean {
		return (this.time.days === 0
			&& this.time.hours === 0
			&& this.time.minutes === 0
			&& this.time.seconds === 0
		);
	}

	clock(): string {
		return `${this.__formatTime(this.time.hours)}:${this.__formatTime(this.time.minutes)}:${this.__formatTime(this.time.seconds)}`;
	}
}
