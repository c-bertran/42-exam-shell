unsigned char reverse_bits(unsigned char octet)
{
	unsigned char reversed = 0;
	for (int i = 0; i < 8; i++)
	{
		reversed = (reversed << 1) | (octet & 1);
		octet >>= 1;
	}
	return reversed;
}
