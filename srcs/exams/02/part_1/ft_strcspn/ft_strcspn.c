#include <stddef.h>

size_t  ft_strcspn(const char *s, const char *reject)
{
	size_t	i = 0, k = 0;

	while (s[i] != '\0')
	{
		while (reject[k] != '\0')
		{
			if (reject[k] == s[i])
				return (i);
			k++;
		}
		k = 0;
		i++;
	}
	return (i);
}
