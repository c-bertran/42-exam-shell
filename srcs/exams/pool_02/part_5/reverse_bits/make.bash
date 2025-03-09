#!/bin/bash

clang -Wall -Werror -Wextra main.c -o reverseBits || exit 100
./reverseBits a > real
./reverseBits B >> real
./reverseBits % >> real
./reverseBits 8 >> real
./reverseBits ~ >> real
./reverseBits z >> real

clang -Wall -Werror -Wextra $1/reverse_bits/reverse_bits.c -o reverseBits2
./reverseBits2 a > fake
./reverseBits2 B >> fake
./reverseBits2 % >> fake
./reverseBits2 8 >> fake
./reverseBits2 ~ >> fake
./reverseBits2 z >> fake

diff -y --suppress-common-lines real fake > __diff

rm -rf reverseBits reverseBits2 real fake
