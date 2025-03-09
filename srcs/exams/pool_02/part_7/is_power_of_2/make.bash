#!/bin/bash

clang -Wall -Werror -Wextra is_power_of_2.c main.c -o isPower || exit 100
./isPower 0 > real
./isPower 1 >> real
./isPower 2 >> real
./isPower 35 >> real
./isPower 36 >> real
./isPower 2048 >> real
./isPower -2048 >> real
./isPower -3 >> real

clang -Wall -Werror -Wextra $1/is_power_of_2/is_power_of_2.c main.c -o isPower2
./isPower2 0 > fake
./isPower2 1 >> fake
./isPower2 2 >> fake
./isPower2 35 >> fake
./isPower2 36 >> fake
./isPower2 2048 >> fake
./isPower2 -2048 >> fake
./isPower2 -3 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash isPower2 0 2048 > /dev/null 2>&1

rm -rf isPower isPower2 real fake
