#!/bin/bash

clang -Wall -Werror -Wextra main.c -o rot_13 || exit 100
./rot_13 > real
./rot_13 "abc" >> real
./rot_13 "abc" "abc" >> real
./rot_13 "page" >> real
./rot_13 "fwtdjetyi" >> real
./rot_13 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" >> real

clang -Wall -Werror -Wextra $1/rot_13/rot_13.c -o rot_132
./rot_132 > fake
./rot_132 "abc" >> fake
./rot_132 "abc" "abc" >> fake
./rot_132 "page" >> fake
./rot_132 "fwtdjetyi" >> fake
./rot_132 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash rot_132 0 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > /dev/null 2>&1

rm -rf rot_13 rot_132 real fake
