#!/bin/bash

clang -Wall -Werror -Wextra swap_bits.c main.c -o swap_bits || exit 100
./swap_bits 0 > real
./swap_bits 4 >> real
./swap_bits "f" >> real
./swap_bits W >> real
./swap_bits "[" >> real

clang -Wall -Werror -Wextra $1/swap_bits/swap_bits.c main.c -o swap_bits2
./swap_bits2 0 > fake
./swap_bits2 4 >> fake
./swap_bits2 "f" >> fake
./swap_bits2 W >> fake
./swap_bits2 "[" >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash swap_bits2 0 "f" > /dev/null 2>&1

rm -rf swap_bits swap_bits2 real fake
