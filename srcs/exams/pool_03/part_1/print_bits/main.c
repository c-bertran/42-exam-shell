#include <unistd.h>
#include <stdlib.h>

void	print_bits(unsigned char octet);

int		main(int argc, char **argv)
{
	(void)argc;
	print_bits(atoi(argv[1]));
	write(1, "\n", 1);
	return (0);
}
