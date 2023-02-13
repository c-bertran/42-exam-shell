
import { existsSync, readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { examDefinition } from 'exams/interface';
import error from './error';
import { lang, langList } from 'langs/index';

interface config {
	checkUpdate: boolean;
	checkLib: boolean;
	signature: boolean;
	exam?: string;
	options: {
		doom: boolean,
		infinite: boolean,
		lang: lang | undefined
	}
}

const __exams__: examDefinition[] = [];
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
	is('exercices');
	if (!obj.exercices.length)
		errors.push('no exercices');
	return errors;
};

/**
 * Read config.json and return this
 */
export const getConfig = (): config => {
	const is = (s: string, o: any) => Object.prototype.hasOwnProperty.call(o, s);
	if (!__config__) {
		let file: Record<string, any> = {};
		if (existsSync(resolve(__dirname, 'exams', 'config.json'))) {
			file = JSON.parse(
				readFileSync(resolve(__dirname, 'exams', 'config.json'), { encoding: 'utf-8' })
			);
		}
		__config__ = {
			checkUpdate: true,
			checkLib: true,
			signature: true,
			exam: undefined,
			options: {
				doom: false,
				infinite: false,
				lang: undefined
			}
		};
		if (Object.keys(file).length) {
			if (is('checkUpdate', file))
				__config__.checkUpdate = file.checkUpdate;
			if (is('checkLib', file))
				__config__.checkLib = file.checkLib;
			if (is('signature', file))
				__config__.signature = file.signature;
			if (is('exam', file))
				__config__.exam = file.exam;
			if (is('options', file)) {
				if (is('doom', file.options))
					__config__.options.doom = file.options.doom;
				if (is('infinite', file.options))
					__config__.options.infinite = file.options.infinite;
				if (is('lang', file.options)) {
					if (!is(file.options.lang, langList)) {
						error(11, { exit: true, data: `defined lang ${file.lang} not exist`});
						throw new Error('config_error');
					} else
						__config__.options.lang = file.options.lang;
				}
			}
		}
	}
	return __config__ as config;
};

/**
 * Import custom exam
 */
export default (): examDefinition[] => {
	if (!__exams__.length && existsSync(resolve(__dirname, 'exams'))) {
		const dirs = readdirSync(resolve(__dirname, 'exams'), { encoding: 'utf-8', withFileTypes: true });
		for (const dir of dirs) {
			const __path = resolve(__dirname, 'exams', dir.name, 'definition.json');
			if (dir.isDirectory() && existsSync(__path)) {
				const __json = JSON.parse(readFileSync(__path) as any);
				const errors = checkObj(__json);
				if (errors.length) {
					error(10, { exit: true, data: errors.join('\n')});
					throw new Error('exam_error');
				}
				__json.custom = true;
				__exams__.push(__json);
			} 
		}
	}
	return __exams__;
};
