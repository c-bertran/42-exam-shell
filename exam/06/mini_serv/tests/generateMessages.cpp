#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <cstdlib>
#include <cstdio>
#include <csignal>
#include <cstring>
#include <sstream>
#include <random>
#include <sys/select.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <fcntl.h>
#include <unistd.h>
#define MIN 10
#define MAX 1000

#pragma region Generate test

typedef std::vector<std::string> messages;

int	randomNumber(int lower = MIN, int upper = MAX)
{
	std::random_device					rand_dev;
	std::mt19937						generator(rand_dev());
	std::uniform_int_distribution<int>	distr(lower, upper);
	return distr(generator);
}

std::string randString(size_t length, bool justSpace = false)
{
	static std::string charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\n";
	static std::string spaceCharset = "                              \n";
	std::string ret;

	if (length)
	{
		for (size_t n = 0; n < length; n++)
		{
			if (justSpace == true)
				ret += spaceCharset.at(randomNumber(0, spaceCharset.length() - 1));
			else
				ret += charset.at(randomNumber(0, charset.length() - 1));
		}
	}
	return ret;
}

messages	generateFakeUserMessage()
{
	int					seed;
	char				iteration = randomNumber(1, 25);
	std::vector<int>	passSeed;
	messages			data;

	for (char x = 0; x < iteration; x++)
	{
		while (true)
		{
			seed = randomNumber();
			if (find(passSeed.begin(), passSeed.end(), seed) == passSeed.end())
				break;
		}
		passSeed.push_back(seed);
		if (!(seed % 7))
			data.push_back(randString(seed, true));
		else
			data.push_back(randString(seed));
	}
	return data;
}

int main()
{
	messages data = generateFakeUserMessage();

	for (messages::iterator it = data.begin(); it != data.end(); it++)
		std::cout << (*it) << std::endl;
	return 0;
}
