import en_US from './en_US';
import fr_FR from './fr_FR';

export type lang = 'en_US' | 'fr_FR';

export const langList: Record<lang, string> = {
	'en_US': 'English',
	'fr_FR': 'Français'
};

const foundValue = (key: string, obj: Record<string, any>): unknown => {
	const get = (p: string[], o: Record<string, any>) =>
		p.reduce((xs, x) =>
			(xs && xs[x])
				? xs[x]
				: null, o);
	return get(key.split('.'), obj);
};

/**
 * Get value of lang, for deep acces, use dot system
 * Example:
 * @example
 *   {
 *     "hello": {
 *        "world": "Hi !"
 *     }
 *   }
 *   => hello.world
 */
export default (key: string, lang: lang = 'en_US'): unknown => {
	switch (lang) {
	case 'fr_FR':
		return foundValue(key, fr_FR);
	case 'en_US':
	default:
		return foundValue(key, en_US);
	}
};
