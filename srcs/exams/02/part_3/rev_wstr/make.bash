#!/bin/bash

clang -Wall -Werror -Wextra main.c -o revWstr || exit 100
./revWstr "paqe fwtdjetyi ytjn eytjoeyjne jeyj" > real
./revWstr "cette phrase ne cache rien" >> real
./revWstr "cette phrase! !ne! cac he rien" >> real
./revWstr "" >> real
./revWstr >> real
./revWstr one two >> real

clang -Wall -Werror -Wextra $1/rev_wstr/rev_wstr.c -o revWstr2
./revWstr2 "paqe fwtdjetyi ytjn eytjoeyjne jeyj" > fake
./revWstr2 "cette phrase ne cache rien" >> fake
./revWstr2 "cette phrase! !ne! cac he rien" >> fake
./revWstr2 "" >> fake
./revWstr2 >> fake
./revWstr2 one two >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash revWstr2 0 "cette phrase! !ne! cac he rien" > /dev/null 2>&1

rm -rf revWstr revWstr2 real fake
