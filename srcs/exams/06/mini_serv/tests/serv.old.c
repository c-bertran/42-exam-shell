#include <errno.h>
#include <netdb.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int clients = 0, fd_max = 0, clientId[65536];
char *msg[65536] = { NULL };
char readBuf[2049], writeBuf[128];
fd_set readFds, writeFds, fds;

int extract_message(char **buf, char **msg)
{
	char	*newbuf;
	int	i;

	*msg = 0;
	if (*buf == 0)
		return (0);
	i = 0;
	while ((*buf)[i])
	{
		if ((*buf)[i] == '\n')
		{
			newbuf = calloc(1, sizeof(*newbuf) * (strlen(*buf + i + 1) + 1));
			if (newbuf == 0)
				return (-1);
			strcpy(newbuf, *buf + i + 1);
			*msg = *buf;
			(*msg)[i + 1] = 0;
			*buf = newbuf;
			return (1);
		}
		i++;
	}
	return (0);
}

char *str_join(char *buf, char *add)
{
	char	*newbuf;
	int		len;

	if (buf == 0)
		len = 0;
	else
		len = strlen(buf);
	newbuf = malloc(sizeof(*newbuf) * (len + strlen(add) + 1));
	if (newbuf == 0)
		return (0);
	newbuf[0] = 0;
	if (buf != 0)
		strcat(newbuf, buf);
	free(buf);
	strcat(newbuf, add);
	return (newbuf);
}

void putstr(int fd, char *s) { write(fd, s, strlen(s)); }

void fatal_error()
{
  putstr(2, "Fatal error\n");
	exit(1);
}

void print_data(int user, char *str)
{
	for (int fd = 0; fd <= fd_max; fd++)
		if (FD_ISSET(fd, &writeFds) && user != fd)
			send(fd, str, strlen(str), 0);
}

int main(int argc, char **argv)
{
	if (argc != 2)
	{
		write(2, "Wrong number of arguments\n", 26);
		exit(1);
	}

	fd_max = socket(AF_INET, SOCK_STREAM, 0);
	if (fd_max < 0)
		fatal_error();
	FD_ZERO(&fds);
	FD_SET(fd_max, &fds);

	int socket = fd_max;
	struct sockaddr_in server;
	bzero(&server, sizeof(server));
	server.sin_family = AF_INET;
	server.sin_addr.s_addr = htonl(2130706433);
	server.sin_port = htons(atoi(argv[1]));
	if (bind(socket, (const struct sockaddr *)&server, sizeof(server)))
		fatal_error();
	if (listen(socket, SOMAXCONN))
		fatal_error();

	while (1)
	{
		readFds = fds;
		writeFds = fds;
		if (select(fd_max + 1, &readFds, &writeFds, NULL, NULL) < 0)
			fatal_error();
		for (int fd = 0; fd <= fd_max; fd++)
		{
			if (FD_ISSET(fd, &readFds))
			{
				if (fd == socket)
				{
					socklen_t address = sizeof(server);
					int client = accept(socket, (struct sockaddr *)&server, &address);
					if (client >= 0)
					{
						// Add client
						fd_max = (client > fd_max) ? client : fd_max;
						clientId[client] = clients++;
						msg[client] = NULL;
						FD_SET(client, &fds);
						sprintf(writeBuf, "server: client %d just arrived\n", clientId[client]);
						print_data(client, writeBuf);
						break;
					}
				}
				else
				{
					ssize_t readSize = recv(fd, readBuf, 2048, 0);
					if (readSize <= 0)
					{
						// Delete client
						sprintf(writeBuf, "server: client %d just left\n", clientId[fd]);
						print_data(fd, writeBuf);
						free(msg[fd]);
						msg[fd] = NULL;
						FD_CLR(fd, &fds);
						close(fd);
						break;
					}
					// Print message
					char *temp;
					readBuf[readSize] = '\0';
					msg[fd] = str_join(msg[fd], readBuf);
					while (extract_message(&(msg[fd]), &temp))
					{
						sprintf(writeBuf, "client %d: ", clientId[fd]);
						print_data(fd, writeBuf);
						print_data(fd, temp);
						free(temp);
						temp = NULL;
					}
				}	
			}
		}
	}
  return 0;
}
