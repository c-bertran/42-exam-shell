import { examDefinition } from '../interface';

export default {
	id: 'old_exam_03',
	dirName: 'old_03',
	name: {
		'en_US': 'Old exam 03',
		'fr_FR': 'Ancien examen 03'
	},
	goal: 100,
	time: '3h',
	exercises: [
		[
			{
				id: 'micro_paint',
				name: {
					'en_US': 'micro_paint',
					'fr_FR': 'micro_paint'
				},
				exponent: 2,
				trace: true,
				allowed_functions: [
					'fopen', 'fread', 'fscanf',
					'fclose', 'write', 'malloc',
					'calloc', 'realloc', 'free',
					'memset', 'powf', 'sqrtf'
				],
				moulinette: true,
				leaks: true,
				copy: {
					user: ['operations', 'graph.png', 'our_micro_paint'],
					check: ['micro_paint.c', 'operations', 'corrects']
				}
			},
			{
				id: 'mini_paint',
				name: {
					'en_US': 'mini_paint',
					'fr_FR': 'mini_paint'
				},
				exponent: 2,
				trace: true,
				allowed_functions: [
					'fopen', 'fread', 'fscanf',
					'fclose', 'write', 'malloc',
					'calloc', 'realloc', 'free',
					'memset', 'powf', 'sqrtf'
				],
				moulinette: true,
				leaks: true,
				copy: {
					user: ['operations', 'graph.png', 'our_mini_paint'],
					check: ['mini_paint.c', 'operations', 'corrects']
				}
			}
		]
	]
} as examDefinition;
