#!/bin/bash

clang -Wall -Werror -Wextra print_bits.c main.c -o printBits || exit 100
./printBits a > real
./printBits Z >> real
./printBits @ >> real
./printBits 5 >> real
./printBits w >> real
./printBits % >> real

clang -Wall -Werror -Wextra $1/print_bits/print_bits.c main.c -o printBits2
./printBits2 a > fake
./printBits2 Z >> fake
./printBits2 @ >> fake
./printBits2 5 >> fake
./printBits2 w >> fake
./printBits2 % >> fake

diff -y --suppress-common-lines real fake > __diff

rm -rf printBits printBits2 real fake
