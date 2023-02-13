#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <math.h>
#include <string.h>

typedef struct	s_zone
{
	int		width;
	int		height;
	char	backgroundChar;
}				t_zone;

typedef struct	s_draw
{	
	char	type;
	char	color;
	float	x;
	float	y;
	float	height;
	float	width;
}				t_draw;

static int ft_putstr(char *str)
{
	for (int x = 0; str[x] != 0; x++)
		write(1, &str[x], 1);
	return 1;
}

void	ft_printtab(char **tab)
{
	for (int x = 0; tab[x]; x++)
	{
		ft_putstr(tab[x]);
		write(1, "\n", 1);
	}
}

int	ft_freetab(char **tab)
{
	for (int x = 0; tab[x]; x++)
		free(tab[x]);
	free(tab);
	return 1;
}

static char	is_in_rectangle(float x, float y, t_draw draw)
{
	float	xbr = draw.x + draw.width;
	float	ybr = draw.y + draw.height;

	if (x >= draw.x && x <= xbr && y >= draw.y && y <= ybr)
	{
		if (x - draw.x < 1.0 || xbr - x < 1.0
			|| y - draw.y < 1.0 || ybr - y < 1.0)
			return (0);
		return (1);
	}
	return (-1);
}

static char	drawing(FILE *file, t_zone zone)
{
	int		ret, i;
	char	**paint;
	t_draw	draw;
	char	n;

	paint = (char **)malloc(sizeof(char *) * (zone.height + 1));
	if (!paint)
		return (1);
	for (i = 0; i < zone.height; i++)
	{
		if (!(paint[i] = calloc(1, zone.width + 1)))
			return ft_freetab(paint);
		memset(paint[i], zone.backgroundChar, zone.width);
	}
	paint[i] = 0;

	draw.type = 0;
	while ((ret = fscanf(file, "%c%c %f %f %f %f %c", &n, &draw.type,
		&draw.x, &draw.y, &draw.width, &draw.height, &draw.color)) == 7)
	{
		if ((draw.type != 'r' && draw.type != 'R')
			|| draw.height <= 0.0 || draw.width <= 0.0
			|| n != '\n'|| draw.color == 0 || draw.color == '\n')
			return ft_freetab(paint);

		for (int y = 0; y < zone.height; y++)
		{
			for (int x = 0; x < zone.width; x++)
			{
				char check = is_in_rectangle(x, y, draw);
				if (check == 0 || (check == 1 && draw.type == 'R'))
					paint[y][x] = draw.color;
			}
		}
		
		draw.type = 0;
	}
	if (draw.type != 0 && ret != -1)
		return ft_freetab(paint);
	ft_printtab(paint);
	ft_freetab(paint);
	return 0;
}

static char	get_info(FILE *file, t_zone *zone)
{
	int	ret = fscanf(file, "%d %d %c", &zone->width, &zone->height, &zone->backgroundChar);
	if (ret != 3
		|| zone->height <= 0 || zone->height > 300
		|| zone->width <= 0 || zone->width > 300
		|| zone->backgroundChar == 0 || zone->backgroundChar == '\n')
		return 1;
	return 0;
}

int 		main(int argc, char **argv)
{
	FILE	*file;
	t_zone	zone;

	if (argc != 2)
		return (ft_putstr("Error: argument\n"));
	if(!(file = fopen(argv[1], "r")))
		return (ft_putstr("Error: Operation file corrupted\n"));
	if (get_info(file, &zone) == 1)
		return (ft_putstr("Error: Operation file corrupted\n"));
	if (drawing(file, zone) == 1)
		return (ft_putstr("Error: Operation file corrupted\n"));
	fclose(file);
	return (0);
}