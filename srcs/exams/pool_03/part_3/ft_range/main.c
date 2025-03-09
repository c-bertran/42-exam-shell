#include <stdio.h>
#include <stdlib.h>

int *ft_range(int start, int end);

int main(int argc, char **argv)
{
	(void)argc;
	int start = atoi(argv[1]), end = atoi(argv[2]);
	int size = (start > end) ? (start - end) + 1 : (end - start) + 1;
	int	*lst = ft_range(atoi(argv[1]), atoi(argv[2]));

	for (int i = 0; i < size; i++)
		printf("%d|", lst[i]);
	printf("\n");
	free(lst);
	return (0);
}
