#!/bin/bash

clang -Wall -Werror -Wextra ft_atoi_base.c main.c -o atoiBase || exit 100
./atoiBase > real
./atoiBase one two >> real
./atoiBase 42 >> real
./atoiBase "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" 8 >> real
./atoiBase 45 16 >> real
./atoiBase 7516 10 >> real
./atoiBase 10 2 >> real
./atoiBase -79 6 >> real
./atoiBase -845 13 >> real

clang -Wall -Werror -Wextra $1/ft_atoi_base/ft_atoi_base.c main.c -o atoiBase2
./atoiBase2 > fake
./atoiBase2 one two >> fake
./atoiBase2 42 >> fake
./atoiBase2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" 8 >> fake
./atoiBase2 45 16 >> fake
./atoiBase2 7516 10 >> fake
./atoiBase2 10 2 >> fake
./atoiBase2 -78 6 >> fake
./atoiBase2 -845 13 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash atoiBase2 0 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" 2 > /dev/null 2>&1

rm -rf atoiBase atoiBase2 real fake
