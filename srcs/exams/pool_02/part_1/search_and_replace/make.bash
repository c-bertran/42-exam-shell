#!/bin/bash

clang -Wall -Werror -Wextra main.c -o search_and_replace || exit 100
./search_and_replace > real
./search_and_replace "abc" >> real
./search_and_replace "abc" "abc" >> real
./search_and_replace "abc" "b" "u" >> real
./search_and_replace "fwtdjetyi" "d" "p" >> real
./search_and_replace "this text    with   nothing " "z" "p" >> real
./search_and_replace "paqe fwtdjetyi   ytjn    eytjoeyjne  jeyj" " " "z" >> real

clang -Wall -Werror -Wextra $1/search_and_replace/search_and_replace.c -o search_and_replace2
./search_and_replace2 > fake
./search_and_replace2 "abc" >> fake
./search_and_replace2 "abc" "abc" >> fake
./search_and_replace2 "abc" "b" "u" >> fake
./search_and_replace2 "fwtdjetyi" "d" "p" >> fake
./search_and_replace2 "this text    with   nothing " "z" "p" >> fake
./search_and_replace2 "paqe fwt48djetyi   ytjn    45     eyt2joeyjne  jeyj" " " "6" >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash search_and_replace2 0 "paqe fwt48djetyi   ytjn    45     eyt2joeyjne  jeyj" " " "6" > /dev/null 2>&1

rm -rf search_and_replace search_and_replace2 real fake
