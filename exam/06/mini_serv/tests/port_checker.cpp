#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <cerrno>
#include <iostream>
#include <chrono>
#include <thread>
#include <iterator>

int main()
{
	struct sockaddr_in sin;
	int _socket, port, min_port = 1024, max_port = 49151;

	_socket = socket(AF_INET, SOCK_STREAM, 0);
	if (_socket == -1)
		return -1;
	sin.sin_family = AF_INET;
	sin.sin_addr.s_addr = htonl(2130706433);
	for (port = min_port; port < max_port; port++)
	{
		sin.sin_port = htons(port);
		if (bind(_socket, (struct sockaddr *)&sin, sizeof(struct sockaddr_in)) == -1)
		{
			if (errno == EADDRINUSE) 
				continue;
			return -1;
		}
		else
			break;
	}
	close(_socket);
	std::this_thread::sleep_for(std::chrono::seconds(3));
	std::cout << port;
	return port;
}
