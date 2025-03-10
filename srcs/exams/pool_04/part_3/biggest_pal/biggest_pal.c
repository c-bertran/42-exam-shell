#include <unistd.h>

int is_palindrome(char *str, int start, int end) {
	while (start < end) {
		if (str[start] != str[end])
			return 0;
		start++;
		end--;
	}
	return 1;
}

void print_str(char *str, int start, int end) {
	while (start <= end) {
		write(1, &str[start], 1);
		start++;
	}
	write(1, "\n", 1);
}

int main(int argc, char **argv) {
	if (argc != 2) {
		write(1, "\n", 1);
		return 0;
	}

	char *str = argv[1];
	int max_len = 0;
	int start_idx = 0;
	int end_idx = 0;

	for (int i = 0; str[i]; i++) {
		for (int j = i; str[j]; j++) {
			if (is_palindrome(str, i, j)) {
				int len = j - i + 1;
				if (len > max_len) {
					max_len = len;
					start_idx = i;
					end_idx = j;
				} else if (len == max_len && i > start_idx) {
					start_idx = i;
					end_idx = j;
				}
			}
		}
	}

	if (max_len > 0)
		print_str(str, start_idx, end_idx);
	else
		write(1, "\n", 1);

	return 0;
}
