#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <fcntl.h>
#include "get_next_line.h"

int	main(int argc, char **argv)
{
	if (argc != 2 || BUFFER_SIZE < 1)
		return 0;
	
	int		fd = open(argv[1], O_RDONLY);
	char	*line;

	line = NULL;
	while ((line = get_next_line(fd)) != NULL)
	{
		printf("%s", line);
		free(line);
		line = NULL;
	}
	free(line);
	line = NULL;
	close(fd);
	return 0;
}
