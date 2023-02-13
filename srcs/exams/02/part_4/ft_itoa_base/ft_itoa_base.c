#include <stdlib.h>

char	*ft_itoa_base(int value, int base) {
	int		i = 0, j = 1;
	char	temp[16], *final = NULL;

	if (base >= 2) {
		if (value < 0) {
			value = -value;
			temp[i] = '-';
			i++;
		}
		while (value) {
			temp[i] = value % base;
			value /= base;
			i++;
		}
		if ((final = (char *)malloc(sizeof(char) * (i + 1))) == ((void *)0))
			return ((void *)0);
		if (temp[0] == '-')
			final[0] = temp[0];
		while (i > 1) {
			--i;
			if (temp[i] < 10)
				final[j] = temp[i] + '0';
			if (temp[i] >= 10)
				final[j] = temp[i] - 10 + 'A';
			j++;
		}
		final[j] = '\0';
	}
	return (final);	
}