#!/bin/bash

clang -Wall -Werror -Wextra print_memory.c main.c -o printMemory || exit 100
./printMemory 0 > real
./printMemory 42 >> real
./printMemory 4624 >> real
./printMemory 417526 >> real
./printMemory 71626548 >> real

clang -Wall -Werror -Wextra $1/print_memory/print_memory.c main.c -o printMemory2
./printMemory2 0 > fake
./printMemory2 42 >> fake
./printMemory2 4624 >> fake
./printMemory2 417526 >> fake
./printMemory2 71626548 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash printMemory2 0 131072 > /dev/null 2>&1

rm -rf printMemory printMemory2 real fake
