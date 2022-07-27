#!/bin/bash

rm -f valgrind_*.log __diff real_serv real client generate_test fake fake_serv

clang -Wall -Werror -Wextra mini_serv.c -o real_serv > /dev/null 2>&1
clang -Wall -Werror -Wextra client.c -o client > /dev/null 2>&1
clang++ -Wall -Werror -Wextra -std=c++11 generate_test.c -o generate_test > /dev/null 2>&1

clang++ -Wall -Werror -Wextra $1/mini_serv.c -o fake_serv > /dev/null 2>&1
if [ $? -ne 0 ]
then
	echo "Failed compilation" >> fake

diff -y --suppress-common-lines real fake > __diff
rm -f real_serv real client generate_test fake fake_serv
