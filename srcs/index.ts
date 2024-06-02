/**
 * examshell
 * Copyright (C) 2022 - 2024 Clément Bertrand (https://github.com/c-bertran/42-exam-shell)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */

import 'modules/fspatch';
import { argv, exit } from 'process';
import args from 'modules/args';
import { lastErrorCode } from 'modules/error';
import main from 'modules/main';
import checklib from 'modules/checklib';
import checkUpdate from 'modules/checkUpdate';
import customExamList, { getConfig } from 'modules/customExamList';
import uncaughtException from 'modules/uncaughtException';

(async () => {
	let instance: main;
	try {
		await args(argv);
		customExamList();
		getConfig();
		if (getConfig().checkUpdate)
			await checkUpdate();
		if (getConfig().checkLib)
			await checklib();

		instance = new main();
		await instance.setLang();
		await instance.setOptions();
		await instance.setExam();
		await instance.startExamen();
		instance.manageClock();
		instance.startPrompt();
	} catch {
		exit(lastErrorCode);
	}
})();

process.on('uncaughtException', (err) => uncaughtException(err));
process.on('uncaughtExceptionMonitor', (err) => uncaughtException(err));
process.on('unhandledRejection', (err: Error) => uncaughtException(err));
