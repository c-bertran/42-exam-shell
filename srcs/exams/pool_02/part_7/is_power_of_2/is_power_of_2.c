int	is_power_of_2(unsigned int n)
{
	if (n > 0 && ((n & (n - 1)) == 0))
		return 1;
	return 0;
}
