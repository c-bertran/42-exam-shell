#!/bin/bash

clang -Wall -Werror -Wextra main.c -o rotone || exit 100
./rotone > real
./rotone "abc" >> real
./rotone "abc" "abc" >> real
./rotone "page" >> real
./rotone "fwtdjetyi" >> real
./rotone "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" >> real

clang -Wall -Werror -Wextra $1/rotone/rotone.c -o rotone2
./rotone2 > fake
./rotone2 "abc" >> fake
./rotone2 "abc" "abc" >> fake
./rotone2 "page" >> fake
./rotone2 "fwtdjetyi" >> fake
./rotone2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash rotone2 0 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > /dev/null 2>&1

rm -rf rotone rotone2 real fake
