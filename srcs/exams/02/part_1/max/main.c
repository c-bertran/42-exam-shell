#include <stdlib.h>
#include <stdio.h>

int	max(int* tab, unsigned int len);

int	main(int argc, char **argv)
{
	if (argc >= 3) {
		int *tab = malloc(sizeof(int) * (argc - 1));
		for (int i = 2; i < argc; i++)
			tab[i - 2] = atoi(argv[i]);
		printf("%d\n", max(tab, atoi(argv[1])));
		free(tab);
	}
	return 0;
}
