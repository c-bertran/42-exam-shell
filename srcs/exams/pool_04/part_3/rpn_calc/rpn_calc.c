#include <stdio.h>
#include <stdlib.h>

int is_operator(char c) {
	return (c == '+' || c == '-' || c == '*' || c == '/' || c == '%');
}

int perform_operation(int a, int b, char op) {
	if (op == '+') return a + b;
	if (op == '-') return a - b;
	if (op == '*') return a * b;
	if (op == '/') return a / b;
	if (op == '%') return a % b;
	return 0;
}

int rpn_calc(char *expr) {
	int stack[1000];
	int top = -1;
	char *token = expr;

	while (*token) {
		while (*token == ' ') token++;
		if (isdigit(*token) || (*token == '-' && isdigit(*(token + 1)))) {
			stack[++top] = atoi(token);
			while (isdigit(*token) || *token == '-') token++;
		} else if (is_operator(*token)) {
			if (top < 1) return 0; // Error
			int b = stack[top--];
			int a = stack[top--];
			stack[++top] = perform_operation(a, b, *token);
			token++;
		} else {
			return 0; // Error
		}
	}
	return (top == 0) ? stack[top] : 0; // Error if more than one element left
}

int main(int argc, char **argv) {
	if (argc != 2) {
		write(1, "Error\n", 6);
		return 1;
	}

	char *expr = argv[1];
	int result = rpn_calc(expr);

	if (result == 0 && argv[1][0] != '0') {
		write(1, "Error\n", 6);
	} else {
		printf("%d\n", result);
	}
	return 0;
}
