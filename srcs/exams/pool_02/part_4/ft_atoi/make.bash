#!/bin/bash

clang -Wall -Werror -Wextra ft_atoi.c main.c -o ftAtoi || exit 100
./ftAtoi "hello world" > real
./ftAtoi "" >> real
./ftAtoi "    " >> real
./ftAtoi 16-789 >> real
./ftAtoi +4096 >> real
./ftAtoi 8 >> real
./ftAtoi 16 >> real
./ftAtoi 128 >> real
./ftAtoi 1024 >> real
./ftAtoi 16384 >> real
./ftAtoi 131072 >> real
./ftAtoi 1048576 >> real
./ftAtoi -1048576 >> real
./ftAtoi -131072 >> real
./ftAtoi -16384 >> real
./ftAtoi -1024 >> real
./ftAtoi -128 >> real
./ftAtoi -16 >> real
./ftAtoi -8 >> real

clang -Wall -Werror -Wextra $1/ft_atoi/ft_atoi.c main.c -o ftAtoi2
./ftAtoi2 "hello world" > fake
./ftAtoi2 "" >> fake
./ftAtoi2 "    " >> fake
./ftAtoi2 16-789 >> fake
./ftAtoi2 +4096 >> fake
./ftAtoi2 8 >> fake
./ftAtoi2 16 >> fake
./ftAtoi2 128 >> fake
./ftAtoi2 1024 >> fake
./ftAtoi2 16384 >> fake
./ftAtoi2 131072 >> fake
./ftAtoi2 1048576 >> fake
./ftAtoi2 -1048576 >> fake
./ftAtoi2 -131072 >> fake
./ftAtoi2 -16384 >> fake
./ftAtoi2 -1024 >> fake
./ftAtoi2 -128 >> fake
./ftAtoi2 -16 >> fake
./ftAtoi2 -8 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash ftAtoi2 0 131072 > /dev/null 2>&1

rm -rf ftAtoi ftAtoi2 real fake
