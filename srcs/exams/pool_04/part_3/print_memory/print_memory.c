#include <unistd.h>

void	print_memory(const void *addr, size_t size) {
	size_t					i = 0, j = 0;
	unsigned char		*p = (unsigned char *)addr;
	char 						*hex = "0123456789abcdef";

	while (i < size) {
		j = 0;
		while (j < 16 && i + j < size) {
			write(1, &hex[(*(p + i + j) / 16) % 16], 1);
			write(1, &hex[*(p + i + j) % 16], 1);
			if (j % 2)
				write(1, " ", 1);
			j++;
		}
		while (j < 16) {
			write(1, "  ", 2);
			if (j % 2)
				write(1, " ", 1);
			j++;
		}
		j = 0;
		while (j < 16 && i + j < size) {
			if (*(p + i + j) >= 32 && *(p + i + j) < 127)
				write(1, p + i + j, 1);
			else
				write(1, ".", 1);
			j++;
		}
		write(1, "\n", 1);
		i += 16;
	}
}
