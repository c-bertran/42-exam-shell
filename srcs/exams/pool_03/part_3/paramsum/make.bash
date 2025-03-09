#!/bin/bash

clang -Wall -Werror -Wextra main.c -o paramSum || exit 100
./paramSum > real
./paramSum 78 >> real
./paramSum 24 78 >> real
./paramSum 90 48 28 22 73 42 83 >> real
./paramSum 15 23 89 17 71 6 38 79 87 99 94 39 54 82 9 >> real
./paramSum 49 11 67 48 15 13 39 18 44 100 17 52 26 62 74 92 79 53 9 88 70 93 55 33 68 69 34 >> real

clang -Wall -Werror -Wextra $1/paramsum/paramsum.c -o paramSum2
./paramSum2 > fake
./paramSum2 78 >> fake
./paramSum2 24 78 >> fake
./paramSum2 90 48 28 22 73 42 83 >> fake
./paramSum2 15 23 89 17 71 6 38 79 87 99 94 39 54 82 9 >> fake
./paramSum2 49 11 67 48 15 13 39 18 44 100 17 52 26 62 74 92 79 53 9 88 70 93 55 33 68 69 34 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash paramSum2 0 90 48 28 22 73 42 83 > /dev/null 2>&1

rm -rf paramSum paramSum2 real fake
