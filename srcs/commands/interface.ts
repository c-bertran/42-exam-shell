import { lang } from 'langs/index';

export interface command {
	name: string;
	description: Record<lang, string>;
	hide?: boolean;
	exec: (command: string[], lang: lang, ...args: any[]) => Promise<void>
}
