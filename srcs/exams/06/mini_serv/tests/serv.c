#include <string.h>
#include <unistd.h>
#include <netdb.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <stdlib.h>
#include <stdio.h>

typedef struct	s_client {
	int						id;
	char					msg[1024];
}								t_client;

t_client				clients[1024];
fd_set					readFds, writeFds, fds;
int							max = 0, next = 0;
char						readBuf[120000], writeBuf[120000];


void						print_data(int isNotFd) {
	for (int fd = 0; fd <= max; fd++) {
		if (FD_ISSET(fd, &writeFds) && fd != isNotFd)
			send(fd, writeBuf, strlen(writeBuf), 0);
	}
}

void						ft_putstr(int fd, char *s) {
	write(fd, s, strlen(s));
}

void						error(char *s) {
	if (s)
		ft_putstr(STDERR_FILENO, s);
	else
		ft_putstr(STDERR_FILENO, "Fatal error\n");
	exit(1);
}


int							main(int argc, char **argv) {
	struct sockaddr_in  server;
	socklen_t           len;
	
	if (argc != 2)
		error("Wrong number of arguments\n");

	int socketFd = socket(AF_INET, SOCK_STREAM, 0);
	if (socketFd < 0)
		error(NULL);

	bzero(&server, sizeof(server));
	bzero(&clients, sizeof(clients));
	FD_ZERO(&fds);
	FD_SET(socketFd, &fds);

	max = socketFd;
	server.sin_family = AF_INET;
	server.sin_addr.s_addr = htonl(2130706433); //127.0.0.1
	server.sin_port = htons(atoi(argv[1]));

	if ((bind(socketFd, (const struct sockaddr *)&server, sizeof(server))) < 0)
		error(NULL);
	if (listen(socketFd, SOMAXCONN) < 0)
		error(NULL);

	while (1) {
		readFds = writeFds = fds;
		if (select(max + 1, &readFds, &writeFds, NULL, NULL) < 0)
			continue;
		for (int fd = 0; fd <= max; fd++) {
			if (FD_ISSET(fd, &readFds)) {
				if (fd == socketFd) {
					int connectFd = accept(socketFd, (struct sockaddr *)&server, &len);
					if (connectFd < 0)
						continue;
					if (connectFd > max)
						max = connectFd;
					clients[connectFd].id = next++;
					FD_SET(connectFd, &fds);
					sprintf(writeBuf, "server: client %d just arrived\n", clients[connectFd].id);
					print_data(connectFd);
				} else {
					int res = recv(fd, readBuf, 65536, 0);
					if (res > 0) {
						for (int x = 0, len = strlen(clients[fd].msg); x < res; x++, len++) {
							clients[fd].msg[len] = readBuf[x];
							if (clients[fd].msg[len] == '\n') {
								clients[fd].msg[len] = '\0';
								sprintf(writeBuf, "client %d: %s\n", clients[fd].id, clients[fd].msg);
								print_data(fd);
								bzero(&clients[fd].msg, strlen(clients[fd].msg));
								len = -1;
							}
						}
					} else {
						sprintf(writeBuf, "server: client %d just left\n", clients[fd].id);
						print_data(fd);
						FD_CLR(fd, &fds);
						close(fd);
					}
				}
				break;
			}
		}
	}
	return 0;
}
