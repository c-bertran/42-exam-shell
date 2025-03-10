#include <stdlib.h>

int		*ft_range(int start, int end)
{
	int		*range, i = 0;

	if (start > end)
		range = (int *)malloc(sizeof(int) * ((start - end) + 1));
	else
		range = (int *)malloc(sizeof(int) * ((end - start) + 1));
	while (start != end)
	{
		range[i++] = start;
		start += (start > end) ? -1 : 1;
	}
	range[i] = start;
	return (range);
}
