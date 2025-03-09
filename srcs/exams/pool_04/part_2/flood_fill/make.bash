#!/bin/bash

clang -Wall -Werror -Wextra flood_fill.c main.c -o floodFill || exit 100
./floodFill 4 4 44 > real
./floodFill 8 8 6 >> real
./floodFill 6 6 75 >> real
./floodFill 12 4 788 >> real
./floodFill 42 54 98756 >> real

clang -Wall -Werror -Wextra $1/flood_fill/flood_fill.c main.c -o floodFill2
./floodFill2 4 4 44 > fake
./floodFill2 8 8 6 >> fake
./floodFill2 6 6 75 >> fake
./floodFill2 12 4 788 >> fake
./floodFill2 42 54 98756 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash floodFill2 0 8 8 6 > /dev/null 2>&1

rm -rf floodFill floodFill2 real fake
