#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <signal.h>
#include <string.h>
#define FALSE 0
#define TRUE 1

// ======= Other ======= //
int	ft_strlen(char *str)
{
	int x = 0;
	while (str[x] != 0)
		++x;
	return x;
}

void	ft_putstr(int fd, char *str)
{
	if (str != NULL)
		write(fd, str, ft_strlen(str));
}

void	ft_error(char *str, char *type)
{
	ft_putstr(STDERR_FILENO, str);
	ft_putstr(STDERR_FILENO, type);
	write(STDERR_FILENO, "\n", 1);
	kill(0, SIGINT);
}

// ======= Command ======= //
void cd(char **argv)
{
	int x = 0;
	while (argv[x])
		++x;
	if (x < 2 || x > 2 || (argv[1] && strcmp(argv[1], "-") == 0))
		ft_error("error: cd: bad arguments", NULL);
	else if (chdir(argv[1]) == -1)
		ft_error("error: cd: cannot change directory to ", argv[1]);
}

int	execute(char **argv, char **env, int stdin)
{
	pid_t pid;
	int fd[2], x = 0;
	char is_last = FALSE;

	while (argv[x] && strcmp(argv[x], "|"))
		++x;
	if (!argv[x])
		is_last = TRUE;
	argv[x] = NULL;
	
	if (pipe(fd) == -1 || (pid = fork()) == -1)
		ft_error("error: fatal", NULL);
	else if (pid == 0)
	{
		// Child
		if (dup2(stdin, STDIN_FILENO) == -1)
			ft_error("error: fatal", NULL);
		if (is_last == FALSE && dup2(fd[1], STDOUT_FILENO) == -1)
			ft_error("error: fatal", NULL);
		close(stdin); close(fd[0]); close(fd[1]);
		if (execve(argv[0], argv, env) == -1)
			ft_error("error: cannot execute ", argv[0]);
	}
	else
	{
		// Parent
		if (dup2(fd[0], stdin) == -1)
			ft_error("error: fatal", NULL);
		close(fd[0]); close(fd[1]);
	}
	return (is_last == FALSE) ? x + 1 : x;
}

void command(char **args, char **env)
{
	int stdin, x = 0, count_command = 0, status;

	if (!args[0])
		return ;
	if (!strcmp(args[0], "cd"))
		return cd(args);
	if ((stdin = dup(STDIN_FILENO)) == -1)
		ft_error("error: fatal", NULL);
	while (args[x])
	{
		x += execute(args + x, env, stdin);
		++count_command;
	}
	close(stdin);
	for (; count_command > 0; count_command--)
		waitpid(-1, &status, 0);
}

int main(int argc, char **argv, char **env)
{
	int x = 1, current = 1;

	if (argc < 2)
		return 0;
	while (argv[x])
	{
		if (strcmp(argv[x], ";") == 0)
		{
			argv[x] = NULL;
			command(argv + current, env);
			++x;
			while (argv[x] && strcmp(argv[x], ";") == 0)
				++x;
			current = x;
		}
		else
			++x;
	}
	command(argv + current, env);
	return 0;
}
