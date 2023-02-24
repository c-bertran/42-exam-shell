import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import yaml from '@rollup/plugin-yaml';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import { version } from './package.json';

const banner = `/**\n* @license\n* examshell\n* Copyright (C) 2022 - ${new Date().getFullYear()} Clément Bertrand (https://github.com/c-bertran/42-exam-shell)\n*\n* This program is free software: you can redistribute it and/or modify\n* it under the terms of the GNU General Public License as published by\n* the Free Software Foundation, either version 3 of the License, or\n* (at your option) any later version.\n*\n* This program is distributed in the hope that it will be useful,\n* but WITHOUT ANY WARRANTY; without even the implied warranty of\n* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n* GNU General Public License for more details.\n*/`;

export default {
	external: [
		'child_process', 'crypto', 'events', 'fs', 'fs/promises', 'http', 'https', 'os', 'path', 'process', 'readline', 'util',
		'glob', 'prompts'
	],
	input: 'srcs/index.ts',
	watch: {
		clearScreen: false,
		buildDelay: 100,
		includes: 'srcs/**/*'
	},
	output: [
		{
			banner,
			chunkFileNames: '[name]_[hash].[format].js',
			entryFileNames: '[name].[format].js',
			format: 'cjs',
			dir: 'dist'
		}
	],
	plugins: [
		replace({
			preventAssignment: true,
			values: {
				'process.env.version': JSON.stringify(version)
			}
		}),
		json(),
		yaml(),
		typescript({
			resolveJsonModule: true
		}),
		terser({
			format: {
				comments: 'some'
			}
		}),
		copy({
			targets: [
				{ src: 'srcs/commands/iddqd/!(*.ts)', dest: 'dist/data/iddqd' },
				{ src: 'srcs/shell/*', dest: 'dist/data/shell' },
				{ src: 'srcs/exams/!(*.ts)', dest: 'dist/data/exams' }
			]
		})
	]
};
