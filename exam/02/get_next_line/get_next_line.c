#include "get_next_line.h"

int ft_strlen(char *str)
{
	int x = 0;
	while (str[x] != '\0')
		++x;
	return x;
}

char *ft_strdup(char *str)
{
	int x = 0;
	char *dest = malloc(sizeof(char) * (ft_strlen(str) + 1));
	if (!dest)
		return NULL;
	for (; str[x] != '\0'; x++)
		dest[x] = str[x];
	dest[x] = '\0';
	return dest;
}

static char	*ft_strjoin(char *s, char c)
{
	char	*str;
	int		i;

	i = 0;
	while (s[i])
		i++;
	str = (char *) malloc(i + 2);
	if (!str)
		return (NULL);
	i = 0;
	while (s[i])
	{
		str[i] = s[i];
		i++;
	}
	str[i] = c;
	str[i + 1] = '\0';
	free(s);
	return (str);
}

char	*get_next_line(int fd)
{
	char	buf;
	char	*line;
	int		ret;
	int		i;

	if (fd < 0)
		return (NULL);
	line = ft_strdup("");
	while ((ret = read(fd, &buf, 1)) > 0)
	{
		line = ft_strjoin(line, buf);
		if (buf == '\n')
			break ;
	}
	i = 0;
	while (line[i])
		i++;
	if (i == 0)
	{
		free(line);
		line = NULL;
	}
	if (ret == -1)
	{
		free(line);
		line = NULL;
	}
	return (line);
}