#!/bin/bash

clang -Wall -Werror -Wextra lcm.c main.c -o lcm || exit 100
./lcm 1 2 > real
./lcm 5 12 >> real
./lcm 42 745 >> real
./lcm 7517 54245 >> real

clang -Wall -Werror -Wextra $1/lcm/lcm.c main.c -o lcm2
./lcm2 1 2 > fake
./lcm2 5 12 >> fake
./lcm2 42 745 >> fake
./lcm2 7517 54245 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash lcm2 0 5 12 > /dev/null 2>&1

rm -rf lcm lcm2 real fake
