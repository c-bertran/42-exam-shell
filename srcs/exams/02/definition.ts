import { examDefinition } from '../interface';

export default {
	id: 'exam_02',
	dirName: '02',
	name: {
		'en_US': 'Exam 02',
		'fr_FR': 'Examen 02'
	},
	goal: 100,
	time: '3h',
	exercises: [
		[
			{
				id: 'first_word',
				dir: 'part_0',
				name: {
					'en_US': 'first_word',
					'fr_FR': 'first_word'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['first_word.c']
				}
			},
			{
				id: 'fizzbuzz',
				dir: 'part_0',
				name: {
					'en_US': 'fizzbuzz',
					'fr_FR': 'fizzbuzz'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['fizzbuzz.c']
				}
			},
			{
				id: 'ft_putstr',
				dir: 'part_0',
				name: {
					'en_US': 'ft_putstr',
					'fr_FR': 'ft_putstr'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['ft_putstr.c', 'main.c']
				}
			},
			{
				id: 'ft_strcpy',
				dir: 'part_0',
				name: {
					'en_US': 'ft_strcpy',
					'fr_FR': 'ft_strcpy'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['ft_strcpy.c', 'main.c']
				}
			},
			{
				id: 'ft_strlen',
				dir: 'part_0',
				name: {
					'en_US': 'ft_strlen',
					'fr_FR': 'ft_strlen'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['ft_strlen.c', 'main.c']
				}
			},
			{
				id: 'ft_swap',
				dir: 'part_0',
				name: {
					'en_US': 'ft_swap',
					'fr_FR': 'ft_swap'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['ft_swap.c', 'main.c']
				}
			},
			{
				id: 'repeat_alpha',
				dir: 'part_0',
				name: {
					'en_US': 'repeat_alpha',
					'fr_FR': 'repeat_alpha'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'rev_print',
				dir: 'part_0',
				name: {
					'en_US': 'rev_print',
					'fr_FR': 'rev_print'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'rot_13',
				dir: 'part_0',
				name: {
					'en_US': 'rot_13',
					'fr_FR': 'rot_13'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'rotone',
				dir: 'part_0',
				name: {
					'en_US': 'rotone',
					'fr_FR': 'rotone'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'search_and_replace',
				dir: 'part_0',
				name: {
					'en_US': 'search_and_replace',
					'fr_FR': 'search_and_replace'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write', 'exit'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'ulstr',
				dir: 'part_0',
				name: {
					'en_US': 'ulstr',
					'fr_FR': 'ulstr'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			}
		],
		[
			{
				id: 'alpha_mirror',
				dir: 'part_1',
				name: {
					'en_US': 'alpha_mirror',
					'fr_FR': 'alpha_mirror'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'camel_to_snake',
				dir: 'part_1',
				name: {
					'en_US': 'camel_to_snake',
					'fr_FR': 'camel_to_snake'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc', 'free', 'realloc', 'write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'do_op',
				dir: 'part_1',
				name: {
					'en_US': 'do_op',
					'fr_FR': 'do_op'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['atoi', 'printf', 'write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'ft_atoi',
				dir: 'part_1',
				name: {
					'en_US': 'ft_atoi',
					'fr_FR': 'ft_atoi'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['ft_atoi.c', 'main.c']
				}
			},
			{
				id: 'ft_strcmp',
				dir: 'part_1',
				name: {
					'en_US': 'ft_strcmp',
					'fr_FR': 'ft_strcmp'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['ft_strcmp.c', 'main.c']
				}
			},
			{
				id: 'ft_strcspn',
				dir: 'part_1',
				name: {
					'en_US': 'ft_strcspn',
					'fr_FR': 'ft_strcspn'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['ft_strcspn.c', 'main.c']
				}
			},
			{
				id: 'ft_strdup',
				dir: 'part_1',
				name: {
					'en_US': 'ft_strdup',
					'fr_FR': 'ft_strdup'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc'],
				copy: {
					check: ['ft_strdup.c', 'main.c']
				}
			},
			{
				id: 'inter',
				dir: 'part_1',
				name: {
					'en_US': 'inter',
					'fr_FR': 'inter'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'is_power_of_2',
				dir: 'part_1',
				name: {
					'en_US': 'is_power_of_2',
					'fr_FR': 'is_power_of_2'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['is_power_of_2.c', 'main.c']
				}
			},
			{
				id: 'last_word',
				dir: 'part_1',
				name: {
					'en_US': 'last_word',
					'fr_FR': 'last_word'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'max',
				dir: 'part_1',
				name: {
					'en_US': 'max',
					'fr_FR': 'max'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['main.c', 'max.c']
				}
			},
			{
				id: 'snake_to_camel',
				dir: 'part_1',
				name: {
					'en_US': 'snake_to_camel',
					'fr_FR': 'snake_to_camel'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc', 'free', 'realloc', 'write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'swap_bits',
				dir: 'part_1',
				name: {
					'en_US': 'swap_bits',
					'fr_FR': 'swap_bits'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['swap_bits.c', 'main.c']
				}
			},
			{
				id: 'union',
				dir: 'part_1',
				name: {
					'en_US': 'union',
					'fr_FR': 'union'
				},
				exponent: 2,
				trace: false,
				allowed_functions: ['write'],
				moulinette: true,
				leaks: true,
				copy: {
					check: ['main.c']
				}
			}
		],
		[
			{
				id: 'add_prime_sum',
				dir: 'part_2',
				name: {
					'en_US': 'add_prime_sum',
					'fr_FR': 'add_prime_sum'
				},
				exponent: 5,
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
				dir: 'part_2',
				name: {
					'en_US': 'epur_str',
					'fr_FR': 'epur_str'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'expand_str',
				dir: 'part_2',
				name: {
					'en_US': 'expand_str',
					'fr_FR': 'expand_str'
				},
				exponent: 5,
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
				dir: 'part_2',
				name: {
					'en_US': 'ft_atoi_base',
					'fr_FR': 'ft_atoi_base'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['ft_atoi_base.c', 'main.c']
				}
			},
			{
				id: 'ft_list_size',
				dir: 'part_2',
				name: {
					'en_US': 'ft_list_size',
					'fr_FR': 'ft_list_size'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['ft_list_size.c', 'main.c']
				}
			},
			{
				id: 'ft_range',
				dir: 'part_2',
				name: {
					'en_US': 'ft_range',
					'fr_FR': 'ft_range'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc'],
				copy: {
					check: ['ft_range.c', 'main.c']
				}
			},
			{
				id: 'ft_rrange',
				dir: 'part_2',
				name: {
					'en_US': 'ft_rrange',
					'fr_FR': 'ft_rrange'
				},
				exponent: 5,
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
				dir: 'part_2',
				name: {
					'en_US': 'hidenp',
					'fr_FR': 'hidenp'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'lcm',
				dir: 'part_2',
				name: {
					'en_US': 'lcm',
					'fr_FR': 'lcm'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['lcm.c', 'main.c']
				}
			},
			{
				id: 'paramsum',
				dir: 'part_2',
				name: {
					'en_US': 'paramsum',
					'fr_FR': 'paramsum'
				},
				exponent: 5,
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
				dir: 'part_2',
				name: {
					'en_US': 'pgcd',
					'fr_FR': 'pgcd'
				},
				exponent: 5,
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
				dir: 'part_2',
				name: {
					'en_US': 'print_hex',
					'fr_FR': 'print_hex'
				},
				exponent: 5,
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
				dir: 'part_2',
				name: {
					'en_US': 'rstr_capitalizer',
					'fr_FR': 'rstr_capitalizer'
				},
				exponent: 5,
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
				dir: 'part_2',
				name: {
					'en_US': 'str_capitalizer',
					'fr_FR': 'str_capitalizer'
				},
				exponent: 5,
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
				dir: 'part_2',
				name: {
					'en_US': 'tab_mult',
					'fr_FR': 'tab_mult'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			}
		],
		[
			{
				id: 'flood_fill',
				dir: 'part_3',
				name: {
					'en_US': 'flood_fill',
					'fr_FR': 'flood_fill'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				copy: {
					check: ['flood_fill.c', 'main.c']
				}
			},
			{
				id: 'fprime',
				dir: 'part_3',
				name: {
					'en_US': 'fprime',
					'fr_FR': 'fprime'
				},
				exponent: 5,
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
				dir: 'part_3',
				name: {
					'en_US': 'ft_itoa',
					'fr_FR': 'ft_itoa'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc'],
				copy: {
					check: ['ft_itoa.c', 'main.c']
				}
			},
			{
				id: 'ft_split',
				dir: 'part_3',
				name: {
					'en_US': 'ft_split',
					'fr_FR': 'ft_split'
				},
				exponent: 5,
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
				dir: 'part_3',
				name: {
					'en_US': 'rev_wstr',
					'fr_FR': 'rev_wstr'
				},
				exponent: 5,
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
				dir: 'part_3',
				name: {
					'en_US': 'rostring',
					'fr_FR': 'rostring'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write', 'malloc', 'free'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'sort_list',
				dir: 'part_3',
				name: {
					'en_US': 'sort_list',
					'fr_FR': 'sort_list'
				},
				exponent: 5,
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
				id: 'brackets',
				dir: 'part_4',
				name: {
					'en_US': 'brackets',
					'fr_FR': 'brackets'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['main.c']
				}
			},
			{
				id: 'brainfuck',
				dir: 'part_4',
				name: {
					'en_US': 'brainfuck',
					'fr_FR': 'brainfuck'
				},
				exponent: 5,
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
				dir: 'part_4',
				name: {
					'en_US': 'checkmate',
					'fr_FR': 'checkmate'
				},
				exponent: 5,
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
				id: 'ft_itoa_base',
				dir: 'part_4',
				name: {
					'en_US': 'ft_itoa_base',
					'fr_FR': 'ft_itoa_base'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['malloc'],
				copy: {
					check: ['ft_itoa_base.c', 'main.c']
				}
			},
			{
				id: 'print_memory',
				dir: 'part_4',
				name: {
					'en_US': 'print_memory',
					'fr_FR': 'print_memory'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write'],
				copy: {
					check: ['print_memory.c', 'main.c']
				}
			},
			{
				id: 'str_maxlenoc',
				dir: 'part_4',
				name: {
					'en_US': 'str_maxlenoc',
					'fr_FR': 'str_maxlenoc'
				},
				exponent: 5,
				trace: false,
				moulinette: true,
				leaks: true,
				allowed_functions: ['write', 'malloc', 'free'],
				copy: {
					check: ['main.c']
				}
			},
		]
	]
} as examDefinition;
