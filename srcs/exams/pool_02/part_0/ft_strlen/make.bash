#!/bin/bash

clang -Wall -Werror -Wextra ft_strlen.c main.c -o ft_strlen || exit 100
./ft_strlen "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > real
./ft_strlen "cette phrase ne cache rien" >> real
./ft_strlen "               cette phrase ne cache rien" >> real
./ft_strlen "                       " >> real
./ft_strlen "" >> real

clang -Wall -Werror -Wextra $1/ft_strlen/ft_strlen.c main.c -o ft_strlen2
./ft_strlen2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > fake
./ft_strlen2 "cette phrase ne cache rien" >> fake
./ft_strlen2 "               cette phrase ne cache rien" >> fake
./ft_strlen2 "                       " >> fake
./ft_strlen2 "" >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash ft_strlen2 0 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > /dev/null 2>&1

rm -rf ft_strlen ft_strlen2 real fake
