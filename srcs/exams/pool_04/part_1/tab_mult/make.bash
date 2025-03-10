#!/bin/bash

clang -Wall -Werror -Wextra main.c -o tabMult || exit 100
./tabMult > real
./tabMult one two >> real
./tabMult 0 >> real
./tabMult 1 >> real
./tabMult 5 >> real
./tabMult 79 >> real
./tabMult 128 >> real
./tabMult 490 >> real
./tabMult 2734 >> real

clang -Wall -Werror -Wextra $1/tab_mult/tab_mult.c -o tabMult2
./tabMult2 > fake
./tabMult2 one two >> fake
./tabMult2 0 >> fake
./tabMult2 1 >> fake
./tabMult2 5 >> fake
./tabMult2 79 >> fake
./tabMult2 128 >> fake
./tabMult2 490 >> fake
./tabMult2 2734 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash tabMult2 0 79 > /dev/null 2>&1

rm -rf tabMult tabMult2 real fake
