import { examDefinition } from '../interface';

export default {
	id: 'pool_04',
	dirName: 'pool_04',
	name: {
		'en_US': 'Pool 04',
		'fr_FR': 'Piscine 04'
	},
	goal: 100,
	time: '3h',
	exercises: [
		[
			{
				id: 'add_prime_sum',
				dir: 'part_0',
				name: {
					'en_US': 'add_prime_sum',
					'fr_FR': 'add_prime_sum'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write', 'exit'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'epur_str',
				dir: 'part_0',
				name: {
					'en_US': 'epur_str',
					'fr_FR': 'epur_str'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'ft_list_size',
				dir: 'part_0',
				name: {
					'en_US': 'ft_list_size',
					'fr_FR': 'ft_list_size'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['ft_list_size.c', 'main.c']
				}
			},
			{
				id: 'ft_rrange',
				dir: 'part_0',
				name: {
					'en_US': 'ft_rrange',
					'fr_FR': 'ft_rrange'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc'],
				copy: {
					check: ['ft_rrange.c', 'main.c']
				}
			},
			{
				id: 'hidenp',
				dir: 'part_0',
				name: {
					'en_US': 'hidenp',
					'fr_FR': 'hidenp'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'pgcd',
				dir: 'part_0',
				name: {
					'en_US': 'pgcd',
					'fr_FR': 'pgcd'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['printf', 'atoi', 'malloc', 'free'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'print_hex',
				dir: 'part_0',
				name: {
					'en_US': 'print_hex',
					'fr_FR': 'print_hex'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'rstr_capitalizer',
				dir: 'part_0',
				name: {
					'en_US': 'rstr_capitalizer',
					'fr_FR': 'rstr_capitalizer'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
		],
		[
			{
				id: 'expand_str',
				dir: 'part_1',
				name: {
					'en_US': 'expand_str',
					'fr_FR': 'expand_str'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'ft_atoi_base',
				dir: 'part_1',
				name: {
					'en_US': 'ft_atoi_base',
					'fr_FR': 'ft_atoi_base'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['ft_atoi_base.c', 'main.c']
				}
			},
			{
				id: 'ft_range',
				dir: 'part_1',
				name: {
					'en_US': 'ft_range',
					'fr_FR': 'ft_range'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc'],
				copy: {
					check: ['ft_range.c', 'main.c']
				}
			},
			{
				id: 'lcm',
				dir: 'part_1',
				name: {
					'en_US': 'lcm',
					'fr_FR': 'lcm'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['lcm.c', 'main.c']
				}
			},
			{
				id: 'paramsum',
				dir: 'part_1',
				name: {
					'en_US': 'paramsum',
					'fr_FR': 'paramsum'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'str_capitalizer',
				dir: 'part_1',
				name: {
					'en_US': 'str_capitalizer',
					'fr_FR': 'str_capitalizer'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'tab_mult',
				dir: 'part_1',
				name: {
					'en_US': 'tab_mult',
					'fr_FR': 'tab_mult'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
		],
		[
			{
				id: 'brainfuck',
				dir: 'part_2',
				name: {
					'en_US': 'brainfuck',
					'fr_FR': 'brainfuck'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write', 'malloc', 'free'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'checkmate',
				dir: 'part_2',
				name: {
					'en_US': 'checkmate',
					'fr_FR': 'checkmate'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write', 'malloc', 'free'],
				copy: {
					user: ['examples.txt'],
					check: ['main.c']
				}
			},
			{
				id: 'flood_fill',
				dir: 'part_2',
				name: {
					'en_US': 'flood_fill',
					'fr_FR': 'flood_fill'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['flood_fill.c', 'main.c']
				}
			},
			{
				id: 'fprime',
				dir: 'part_2',
				name: {
					'en_US': 'fprime',
					'fr_FR': 'fprime'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['printf', 'atoi'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'ft_itoa',
				dir: 'part_2',
				name: {
					'en_US': 'ft_itoa',
					'fr_FR': 'ft_itoa'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc'],
				copy: {
					check: ['ft_itoa.c', 'main.c']
				}
			},
			{
				id: 'ft_itoa_base',
				dir: 'part_2',
				name: {
					'en_US': 'ft_itoa_base',
					'fr_FR': 'ft_itoa_base'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc'],
				copy: {
					check: ['ft_itoa_base.c', 'main.c']
				}
			},
			{
				id: 'ft_list_foreach',
				dir: 'part_2',
				name: {
					'en_US': 'ft_list_foreach',
					'fr_FR': 'ft_list_foreach'
				},
				trace: false,
				moulinette: true,
				copy: {
					user: ['list.h'],
					check: ['ft_list_foreach.c', 'ft_list.h', 'main.c']
				}
			},
			{
				id: 'ft_list_remove_if',
				dir: 'part_2',
				name: {
					'en_US': 'ft_list_remove_if',
					'fr_FR': 'ft_list_remove_if'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['free'],
				copy: {
					user: ['list.h'],
					check: ['ft_list_remove_if.c', 'ft_list.h', 'main.c']
				}
			},
			{
				id: 'ft_split',
				dir: 'part_2',
				name: {
					'en_US': 'ft_split',
					'fr_FR': 'ft_split'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc'],
				copy: {
					check: ['ft_split.c', 'main.c']
				}
			},
			{
				id: 'rev_wstr',
				dir: 'part_2',
				name: {
					'en_US': 'rev_wstr',
					'fr_FR': 'rev_wstr'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write', 'malloc', 'free'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'rostring',
				dir: 'part_2',
				name: {
					'en_US': 'rostring',
					'fr_FR': 'rostring'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write', 'malloc', 'free'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'sort_int_tab',
				dir: 'part_2',
				name: {
					'en_US': 'sort_int_tab',
					'fr_FR': 'sort_int_tab'
				},
				trace: false,
				moulinette: true,
				leaks: false,
				copy: {
					check: ['sort_int_tab.c', 'main.c']
				}
			},
			{
				id: 'sort_list',
				dir: 'part_2',
				name: {
					'en_US': 'sort_list',
					'fr_FR': 'sort_list'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					user: ['list.h'],
					check: ['list.h', 'sort_list.c', 'main.c']
				}
			}
		],
		[
			{
				id: 'biggest_pal',
				dir: 'part_3',
				name: {
					'en_US': 'biggest_pal',
					'fr_FR': 'biggest_pal'
				},
				trace: false,
				moulinette: true,
				allowed_functions: ['write'],
				copy: {
					check: ['biggest_pal.c']
				}
			},
			{
				id: 'brackets',
				dir: 'part_3',
				name: {
					'en_US': 'brackets',
					'fr_FR': 'brackets'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'cycle_detector',
				dir: 'part_3',
				name: {
					'en_US': 'cycle_detector',
					'fr_FR': 'cycle_detector'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc', 'free'],
				copy: {
					user: ['ft_list.h'],
					check: ['cycle_detector.c', 'ft_list.h', 'main.c']
				}
			},
			{
				id: 'options',
				dir: 'part_3',
				name: {
					'en_US': 'options',
					'fr_FR': 'options'
				},
				trace: false,
				moulinette: true,
				leaks: false,
				allowed_functions: ['write'],
				copy: {
					check: ['options.c']
				}
			},
			{
				id: 'print_memory',
				dir: 'part_3',
				name: {
					'en_US': 'print_memory',
					'fr_FR': 'print_memory'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['print_memory.c', 'main.c']
				}
			},
			{
				id: 'rpn_calc',
				dir: 'part_3',
				name: {
					'en_US': 'rpn_calc',
					'fr_FR': 'rpn_calc'
				},
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['atoi', 'printf', 'write', 'malloc', 'free'],
				copy: {
					check: ['rpn_calc.c']
				}
			},
		],
	],
} as examDefinition;
