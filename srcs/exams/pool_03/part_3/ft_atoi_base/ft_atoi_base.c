int		value_of(char c)
{
	if (c >= '0' && c <= '9')
		return c - '0';
	else if (c >= 'a' && c <= 'f')
		return c - 'a' + 10;
	else if (c >= 'A' && c <= 'F')
		return c - 'A' + 10;
	return 0;
}

int		isvalid(char c, int b)
{
	char digits[17] = "0123456789abcdef";
	char digits2[17] = "0123456789ABCDEF";

	while (b--) {
		if (digits[b] == c || digits2[b] == c)
			return 1;
	}
	return 0;
}

int		ft_atoi_base(const char *str, int str_base)
{
	int result = 0;
	int sign = 1;

	while (*str <= 32)
		str++;
	if (*str == '-')
		sign = -1;
	if (*str == '-' || *str == '+')
		++str;
	while (isvalid(*str, str_base))
		result = result * str_base + value_of(*str++);
	return result * sign;
}
