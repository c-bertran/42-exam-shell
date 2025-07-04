import { existsSync, readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import type { challengeDefinition } from 'challenges/interface';
import error from './error';
import { lang, langList } from 'langs/index';

interface config {
	checkUpdate: boolean;
	checkLib: boolean;
	signature: boolean;
	challenge?: string;
	lang?: lang;
	optionsIsSet: boolean;
	options: {
		doom: boolean;
		infinite: boolean;
	}
}

const __challenges__: challengeDefinition[] = [];
let __config__: config | undefined = undefined;

const checkObj = (obj: any): string[] => {
	const errors: string[] = [];
	const is = (s: string, o: any = obj) => {
		if (!Object.prototype.hasOwnProperty.call(o, s))
			errors.push(`${s} is undefined`);
	};
	is('id');
	is('dirName');
	is('name');
	if (typeof obj.name !== 'object')
		errors.push('name is not an object');
	else {
		is('fr_FR', obj.name);
		is('en_US', obj.name);
	}
	is('goal');
	is('time');
	is('exercises');
	if (!obj.exercises.length)
		errors.push('no exercises');
	return errors;
};

/**
 * Read config.json and return this
 */
export const getConfig = (): config => {
	const is = (s: string, o: any) => Object.prototype.hasOwnProperty.call(o, s);
	if (!__config__) {
		let file: Record<string, any> = {};

		if (existsSync(resolve(cwd(), 'challenges', 'config.json'))) {
			file = JSON.parse(
				readFileSync(resolve(cwd(), 'challenges', 'config.json'), { encoding: 'utf-8' })
			);
		}

		__config__ = {
			checkUpdate: true,
			checkLib: true,
			signature: true,
			challenge: undefined,
			lang: undefined,
			optionsIsSet: false,
			options: {
				doom: false,
				infinite: false
			}
		};

		if (Object.keys(file).length) {
			if (is('checkUpdate', file))
				__config__.checkUpdate = file.checkUpdate;
			if (is('checkLib', file))
				__config__.checkLib = file.checkLib;
			if (is('signature', file))
				__config__.signature = file.signature;
			if (is('challenge', file) && file.challenge)
				__config__.challenge = file.challenge;
			
			if (is('lang', file) && file.lang) {
				if (!is(file.lang, langList)) {
					error(11, { exit: true, data: `defined lang ${file.lang} not exist`});
					throw new Error('config_error');
				} else
					__config__.lang = file.lang;
			}

			if (is('options', file) && Object.keys(file.options).length) {
				__config__.optionsIsSet = true;
				if (is('doom', file.options) && file.options.doom)
					__config__.options.doom = file.options.doom;
				if (is('infinite', file.options) && file.options.infinite)
					__config__.options.infinite = file.options.infinite;
			}
		}
	}
	return __config__ as config;
};

/**
 * Import custom challenges
 */
export default (): examDefinition[] => {
	if (!__challenges__.length && existsSync(resolve(cwd(), 'challenges'))) {
		const dirs = readdirSync(resolve(cwd(), 'challenges'), { encoding: 'utf-8', withFileTypes: true });
		for (const dir of dirs) {
			const __path = resolve(cwd(), 'challenges', dir.name, 'definition.json');
			if (dir.isDirectory() && existsSync(__path)) {
				const __json = JSON.parse(readFileSync(__path) as any);
				const errors = checkObj(__json);
				if (errors.length) {
					error(10, { exit: true, data: errors.join('\n')});
					throw new Error('challenge_error');
				}
				__json.custom = true;
				__challenges__.push(__json);
			} 
		}
	}
	return __challenges__;
};
