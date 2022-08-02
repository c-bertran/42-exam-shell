#include <cstddef>
#include <cstring>
#include <iostream>
#include <string>
#include <vector>
#include <random>
#include <chrono>
#include <thread>
#include <iterator>
#define MIN 10
#define MAX 1000

static unsigned int					seed;
static std::mt19937					prng;
typedef std::vector<std::string>	messages;
typedef std::vector<int>			wait_time;

int	randomNumber(int lower = MIN, int upper = MAX)
{
	return std::uniform_int_distribution<int>(lower, upper)(prng);
}

std::string randString(size_t length, bool justSpace = false)
{
	static std::string	charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\n";
	static std::string	spaceCharset = "                              \n";
	std::string			ret;

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

messages	generateFakeUserMessage(char iteration)
{
	int			seed = 0;
	messages	data;

	for (char x = 0; x < iteration; x++)
	{
		seed = randomNumber();
		if (!(seed % 7))
			data.push_back(randString(seed, true));
		else
			data.push_back(randString(seed));
	}
	return data;
}

wait_time generateFakeTime(char iteration)
{
	wait_time	generateTime;

	for (char x = 0; x < iteration; x++)
		generateTime.push_back(randomNumber(400, 1000));
	return generateTime;
}

int ceil(int num, int dem) { return ((num + dem - 1) / dem); }

/**
 * Reproductible fake message(s) generator
 */
int main(int argc, char **argv)
{
	if (argc >= 2)
		seed = static_cast<unsigned int>(std::stoul(argv[1], nullptr, 10));
	else
		seed = std::chrono::system_clock::now().time_since_epoch().count();
	prng.seed(seed);

	char iteration = randomNumber(1, 15);
	wait_time generate_time = generateFakeTime(iteration);
	
	
	if (argc >= 3 && strncmp(argv[2], "time", 5) == 0)
	{
		int ret = 0;
		for (wait_time::iterator it = generate_time.begin(); it != generate_time.end(); it++)
			ret += (*it);
		std::cout << ceil(ret, 1000) << std::endl;
		return ceil(ret, 1000);
	}
	
	messages data = generateFakeUserMessage(iteration);

	for (messages::iterator it = data.begin(); it != data.end(); it++)
	{
		std::this_thread::sleep_for(std::chrono::milliseconds(randomNumber(400, 1000)));
		std::cout << (*it) << std::endl;
	}
	return 0;
}
