#include <unistd.h>
#define TRUE 1
#define FALSE 0

#pragma region Misc
int		ft_strlen(char *s) {
	int x = 0;
	while (s[x])
		++x;
	return x;
}

void	ft_putstr(char *s) {
	write(1, s, ft_strlen(s));
}
#pragma endregion Misc

#pragma region Check
int		isPiece(char p) {
	if (p == 'P' || p == 'Q' || p == 'B' || p == 'R')
		return TRUE;
	return FALSE;
}

int		bishop(char **argv, int y, int x) {
	int	len = (int)ft_strlen(argv[1]), tempOne = y, tempTwo = x;

	while (++tempOne <= len && ++tempTwo < len && isPiece(argv[tempOne][tempTwo]) != 1) //Down Right
	{
		if (argv[tempOne][tempTwo] == 'K')
			return (1);
	}
	tempOne = y;
	tempTwo = x;
	while (--tempOne >= 1 && --tempTwo >= 0 && isPiece(argv[tempOne][tempTwo]) != 1) //Down Left
	{
		if (argv[tempOne][tempTwo] == 'K')
			return (1);
	}
	tempOne = y;
	tempTwo = x;
	while (--tempOne >= 1 && ++tempTwo < len && isPiece(argv[tempOne][tempTwo]) != 1) //Up Right
	{
		if (argv[tempOne][tempTwo] == 'K')
			return (1);
	}
	tempOne = y;
	tempTwo = x;
	while (--tempOne >= 1 && --tempTwo >= 0 && isPiece(argv[tempOne][tempTwo]) != 1) //Up Left
	{
		if (argv[tempOne][tempTwo] == 'K')
			return (1);
	}
	return (0);
}

int		rook(char **argv, int y, int x) {
	int	len = (int)ft_strlen(argv[y]), temp = x;

	while (++temp < len && isPiece(argv[y][temp]) != 1) // Horizontal++
	{
		if (argv[y][temp] == 'K')
			return TRUE;
	}
	temp = x;
	while (--temp >= 0 && isPiece(argv[y][temp]) != 1) // Horizontal--
	{
		if (argv[y][temp] == 'K')
			return TRUE;
	}
	temp = y;
	while (++temp <= len && isPiece(argv[temp][x]) != 1) // Vertical--
	{
		if (argv[temp][x] == 'K')
			return TRUE;
	}
	temp = y;
	while (--temp >= 1 && isPiece(argv[temp][x]) != 1) // Vertical++
	{
		if (argv[temp][x] == 'K')
			return TRUE;
	}
	return FALSE;
}

int		queen(char **argv, int y, int x) {
	return (rook(argv, y, x) || bishop(argv, y, x));
}

int		pawn(char **argv, int y, int x) {
	if (y > 1
		&& (
			(argv[y - 1][x - 1] == 'K')
			|| (argv[y -1][x + 1] == 'K')
		)
	)
		return TRUE;
	return FALSE;
}

int		check(char **argv) {
	int		x = 0, y = 1;
	
	while (argv[y]) {
		x = 0;
		while (argv[y][x]) {
			if (
				(argv[y][x] == 'P' && pawn(argv, y, x))
				|| (argv[y][x] == 'R' && rook(argv, y, x))
				|| (argv[y][x] == 'B' && bishop(argv, y, x))
				|| (argv[y][x] == 'Q' && queen(argv, y, x))
			)
				return TRUE;
			++x;
		}
		++y;
	}
	return FALSE;
}
#pragma endregion Check

int		main(int argc, char **argv) {
	if (argc > 1 && argc == (ft_strlen(argv[1]) + 1)) {
		int x = 1;

		while (argv[x] != NULL) {
			if (argc != (ft_strlen(argv[x]) + 1)) {
				ft_putstr("Fail\n");
				return FALSE;
			}
			++x;
		}
		if (check(argv))
			ft_putstr("Success");
		else
			ft_putstr("Fail");
	}
	else if (argc > 1)
		ft_putstr("Fail");
	ft_putstr("\n");
	return FALSE;
}
