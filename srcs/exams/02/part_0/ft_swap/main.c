#include <stdio.h>
#include <stdlib.h>

void	ft_swap(int *a, int *b);

int main(int argc, char **argv)
{
	(void)argc;

	int	n1 = atoi(argv[1]), n2 = atoi(argv[2]);
	int	*a, *b;

	a = &n1;
	b = &n2;
	printf("%u-%u|", *a, *b);
	ft_swap(a, b);
	printf("%u-%u\n", *a, *b);
	
	return 0;
}
