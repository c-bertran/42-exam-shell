#!/bin/bash

clang -Wall -Werror -Wextra main.c -o fPrime || exit 100
./fPrime > real
./fPrime one two >> real
./fPrime 0 >> real
./fPrime 1 >> real
./fPrime 5 >> real
./fPrime 79 >> real
./fPrime 128 >> real
./fPrime 490 >> real
./fPrime 2734 >> real
./fPrime 2879456 >> real
./fPrime -67 >> real

clang -Wall -Werror -Wextra $1/fprime/fprime.c -o fPrime2
./fPrime2 > fake
./fPrime2 one two >> fake
./fPrime2 0 >> fake
./fPrime2 1 >> fake
./fPrime2 5 >> fake
./fPrime2 79 >> fake
./fPrime2 128 >> fake
./fPrime2 490 >> fake
./fPrime2 2734 >> fake
./fPrime2 2879456 >> fake
./fPrime2 -67 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash fPrime2 0 79 > /dev/null 2>&1

rm -rf fPrime fPrime2 real fake
