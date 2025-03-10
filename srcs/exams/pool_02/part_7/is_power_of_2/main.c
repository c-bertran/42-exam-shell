#include <stdlib.h>
#include <stdio.h>

int	is_power_of_2(unsigned int n);

int	main(int argc, char **argv)
{
	(void)argc;

	printf("%d\n", is_power_of_2(atoi(argv[1])));
	return 0;
}