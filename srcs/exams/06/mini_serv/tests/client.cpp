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
#define BUFFER_SIZE 65535

volatile sig_atomic_t running;
void stop(int signal)
{
	(void)signal;
	running = 0;
}

int	main(int argc, char **argv)
{
	fd_set reads, writes;
	char buffer[BUFFER_SIZE];
	int flag_ln = 0, do_send = 0, sockfd = 0;
	struct sockaddr_in server_addr;

	if (argc < 2)
		return 1;
	if ((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0)
		return 2;
	server_addr.sin_family = AF_INET;
	server_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
	server_addr.sin_port = htons(atoi(argv[1]));
	socklen_t addr_len = sizeof(struct sockaddr);
	if (connect(sockfd, (struct sockaddr*)&server_addr, addr_len) < 0)
		return 3;
	fcntl(sockfd, F_SETFL, O_NONBLOCK);
	fcntl(STDIN_FILENO, F_SETFL, O_NONBLOCK);
	running = 1;
	signal(SIGINT, stop);
	while (running)
	{
		FD_ZERO(&reads);
		FD_ZERO(&writes);
		FD_SET(sockfd, &reads);
		FD_SET(STDIN_FILENO, &reads);
		if (do_send)
			FD_SET(sockfd, &writes);
		int activity = select(sockfd + 1, &reads, &writes, NULL, NULL);
		if (activity > 0)
		{
			if (FD_ISSET(sockfd, &reads))
			{
				int received = recv(sockfd, buffer, BUFFER_SIZE - 1, MSG_DONTWAIT);
				if (received <= 0)
					break;
				buffer[received] = 0;
				std::cout << buffer;
			}
			if (FD_ISSET(sockfd, &writes) && do_send)
			{
				size_t length = strlen(buffer);
				send(sockfd, buffer, length, MSG_DONTWAIT);
				do_send = 0;
				flag_ln++;
			}
			if (FD_ISSET(STDIN_FILENO, &reads))
			{
				ssize_t typed = read(STDIN_FILENO, buffer, BUFFER_SIZE - 1);
			#ifdef MAIN
				if (typed < 0)
					break;
			#else
				if (typed <= 0)
					break;
			#endif
				buffer[typed] = 0;
				do_send = 1;
			}
		}
	}
	close(sockfd);
	return 0;
}
