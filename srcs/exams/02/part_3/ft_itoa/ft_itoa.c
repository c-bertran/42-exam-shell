#include <stdlib.h>

size_t	ft_strlcpy(char *dst, const char *src, size_t dstsize)
{
	unsigned long int	i;
	unsigned long int	count;

	i = 0;
	count = 0;
	if (dst == 0)
		return (0);
	if (src[0] == '\0')
	{
		dst[i] = '\0';
		return (0);
	}
	while (src[count] != '\0')
		count++;
	if (count > 0 && dstsize > 0)
	{
		while ((dstsize-- - 1 > 0) && (src[i] != '\0'))
		{
			dst[i] = src[i];
			i++;
		}
		dst[i] = '\0';
	}
	return (count);
}

size_t	ft_strlen(const char *s)
{
	unsigned long int	len;

	len = 0;
	while (*s++)
		len++;
	return (len);
}


char	*ft_strdup(const char *s1)
{
	char			*dest;
	unsigned int	length;

	length = ft_strlen(s1);
	if (!(dest = malloc(sizeof(char) * (length + 1))))
		return (NULL);
	ft_strlcpy(dest, s1, length + 1);
	return (dest);
}

char	*ft_itoa(int n)
{
	char	buff[12];
	int		i = 10;
	int		sign = n < 0 ? 1 : 0;

	buff[11] = 0;
	buff[10] = '0';
	if (!n)
		--i;
	while (n)
	{
		buff[i--] = ((n % 10) < 0 ? -(n % 10) : (n % 10)) + '0';
		n /= 10;
	}
	if (sign)
		buff[i--] = '-';
	return (ft_strdup(buff + i + 1));
}
