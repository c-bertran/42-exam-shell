#include <stdio.h>
#include <stdlib.h>

unsigned int	lcm(unsigned int a, unsigned int b);

int		main(int argc, char **argv)
{
	(void)argc;

	unsigned int a = atoi(argv[1]);
	unsigned int b = atoi(argv[2]);
	printf("%d\n", lcm(a,b));
	return 0;
}