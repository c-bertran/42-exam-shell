#!/bin/bash

clang -Wall -Werror -Wextra ft_rrange.c main.c -o rrange || exit 100
./rrange 1 2 > real
./rrange 5 12 >> real
./rrange -42 745 >> real
./rrange -7517 54245 >> real

clang -Wall -Werror -Wextra $1/ft_rrange/ft_rrange.c main.c -o rrange2
./rrange2 1 2 > fake
./rrange2 5 12 >> fake
./rrange2 -42 745 >> fake
./rrange2 -7517 54245 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash rrange2 0 5 12 > /dev/null 2>&1

rm -rf rrange rrange2 real fake
