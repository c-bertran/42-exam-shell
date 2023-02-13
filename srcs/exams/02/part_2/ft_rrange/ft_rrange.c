#include <stdlib.h>

int		*ft_rrange(int start, int end)
{
	int		*range, i = 0;

	if (start > end)
		range = (int *)malloc(sizeof(int) * ((start - end) + 1));
	else
		range = (int *)malloc(sizeof(int) * ((end - start) + 1));
	while (start != end)
	{
		range[i++] = end;
		end -= (start > end) ? -1 : 1;
	}
	range[i] = end;
	return (range);
}
