#include <unistd.h>

unsigned char reverse_bits(unsigned char b);

int	main(int argc, char **argv)
{
	(void)argc;
	unsigned char c;

	c = argv[1][0];
	printf("%c\n%c\n", c, reverse_bits(c));
	return (0);
}
