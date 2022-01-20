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

char *ft_strjoin(char *one, char *two)
{
	char *dest = malloc(sizeof(char) * (ft_strlen(one) + ft_strlen(two) + 1));

	if (!dest)
		return NULL;
	int x = 0;
	for (int y = 0; one[y] != '\0'; y++)
		dest[x++] = one[y];
	for (int y = 0; two[y] != '\0'; y++)
		dest[x++] = two[y];
	dest[x] = '\0';
	return dest;
}

char search(char *str, char c)
{
	int x = 0;
	while (str[x] != '\0')
	{
		if (str[x] == c)
			return 1;
		++x;
	}
	return 0;
}

int get_next_line(char **line)
{
	static char *dest;
	char buf[BUFFER_SIZE];
	int ret;

	if (!line)
		return -1;
	while ((ret = read(STDIN_FILENO, buf, BUFFER_SIZE)) > 0)
	{
		buf[ret] = '\0';
		if (!dest)
			dest = ft_strdup(buf);
		else
		{
			char *new = ft_strjoin(dest, buf);
			free(dest);
			dest = new;
		}
		if (!dest)
			return -1;
		if (search(dest, '\n'))
			break;
	}
	if (ret < 0)
		return -1;
	else if (ret == 0 && dest == NULL)
	{
		*line = ft_strdup("\0");
		return 0;
	}
	else
	{
		int cbreak = 0;
		while (dest[cbreak] != '\n' && dest[cbreak] != '\0')
			++cbreak;
		if (dest[cbreak] == '\n')
		{
			*line = malloc(sizeof(char) * (cbreak + 1));
			if (!(*line))
				return -1;
			for (int x = 0; x < cbreak; x++)
				(*line)[x] = dest[x];
			(*line)[cbreak] = '\0';
			char *new = ft_strdup(&dest[cbreak + 1]);
			free(dest);
			dest = new;
			if (dest[0] == '\0')
			{
				free(dest);
				dest = NULL;
			}
			return 1;
		}
		else
		{
			*line = ft_strdup(dest);
			free(dest);
			return 0;
		}
	}
}
