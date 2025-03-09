#!/bin/bash

clang -Wall -Werror -Wextra ft_split.c main.c -o ftSplit || exit 100
./ftSplit "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > real
./ftSplit "cette phrase ne cache rien" >> real
./ftSplit "               cette phrase ne cache rien" >> real
./ftSplit "                       " >> real
./ftSplit "cette phrase ne cache rien               " >> real

clang -Wall -Werror -Wextra $1/ft_split/ft_split.c main.c -o ftSplit2
./ftSplit2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > fake
./ftSplit2 "cette phrase ne cache rien" >> fake
./ftSplit2 "               cette phrase ne cache rien" >> fake
./ftSplit2 "                       " >> fake
./ftSplit2 "cette phrase ne cache rien               " >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash ftSplit2 0 "cette phrase ne cache rien" > /dev/null 2>&1

rm -rf ftSplit ftSplit2 real fake
