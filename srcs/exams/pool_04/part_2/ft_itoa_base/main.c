#include <stdio.h>
#include <stdlib.h>

char	*ft_itoa_base(int value, int base);

int		main(int argc, char **argv) {
	if (argc > 3) {
		char *s = ft_itoa_base(atoi(argv[1]), atoi(argv[2]));
		printf(
			"Number:%s|Base:%s|Result:%s\n",
			argv[1],
			argv[2],
			s
		);
		free(s);
	}
	return 0;
}
