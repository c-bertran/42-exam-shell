#!/bin/bash

clang -Wall -Werror -Wextra main.c -o repeat_alpha || exit 100
./repeat_alpha > real
./repeat_alpha "abc" >> real
./repeat_alpha "abc" "abc" >> real
./repeat_alpha "page" >> real
./repeat_alpha "fwtdjetyi" >> real
./repeat_alpha "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" >> real

clang -Wall -Werror -Wextra $1/repeat_alpha/repeat_alpha.c -o repeat_alpha2
./repeat_alpha2 > fake
./repeat_alpha2 "abc" >> fake
./repeat_alpha2 "abc" "abc" >> fake
./repeat_alpha2 "page" >> fake
./repeat_alpha2 "fwtdjetyi" >> fake
./repeat_alpha2 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash repeat_alpha2 0 "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" > /dev/null 2>&1

rm -rf repeat_alpha repeat_alpha2 real fake
