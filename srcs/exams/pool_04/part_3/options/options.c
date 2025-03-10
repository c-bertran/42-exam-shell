#include <unistd.h>

void print_usage(void) {
	write(1, "options: abcdefghijklmnopqrstuvwxyz\n", 36);
}

void print_invalid_option(void) {
	write(1, "Invalid Option\n", 15);
}

void print_options(int options) {
	char buffer[35];
	for (int i = 0; i < 32; i++) {
		buffer[34 - i - (i / 8)] = (options & (1 << i)) ? '1' : '0';
		if (i % 8 == 7) {
			buffer[34 - i - (i / 8) - 1] = ' ';
		}
	}
	buffer[34] = '\n';
	write(1, buffer, 35);
}

int main(int argc, char **argv) {
	int options = 0;

	if (argc == 1) {
		print_usage();
		return 0;
	}

	for (int i = 1; i < argc; i++) {
		if (argv[i][0] == '-') {
			for (int j = 1; argv[i][j]; j++) {
				if (argv[i][j] >= 'a' && argv[i][j] <= 'z') {
					options |= (1 << (argv[i][j] - 'a'));
				} else if (argv[i][j] == 'h') {
					print_usage();
					return 0;
				} else {
					print_invalid_option();
					return 1;
				}
			}
		} else {
			print_invalid_option();
			return 1;
		}
	}

	if (options & (1 << ('h' - 'a'))) {
		print_usage();
		return 0;
	}

	print_options(options);
	return 0;
}
