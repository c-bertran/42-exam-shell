#include <unistd.h>

int	main(int argc, char **argv)
{
	int x = 0, y = 0;

	if (argc == 3) {
		while (argv[1][x] && argv[2][y]) {
			if (argv[1][x] == argv[2][y])
				++x;
			++y;
		}
		if (!argv[1][x])
			write(1, "1", 1);
		else
			write(1, "0", 1);
	}
	write(1, "\n", 1);
	return 0;
}
