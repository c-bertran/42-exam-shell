#!/bin/bash

clang -Wall -Werror -Wextra main.c -o snakeToCamel || exit 100
./snakeToCamel "hello_world_and_plip" > real
./snakeToCamel "helloWorldAndCoucou" >> real
./snakeToCamel "wonder_ful_orld" >> real
./snakeToCamel "" >> real
./snakeToCamel one two >> real
./snakeToCamel >> real

clang -Wall -Werror -Wextra $1/snake_to_camel/snake_to_camel.c -o snakeToCamel2
./snakeToCamel2 "hello_world_and_plip" > fake
./snakeToCamel2 "helloWorldAndCoucou" >> fake
./snakeToCamel2 "wonder_ful_orld" >> fake
./snakeToCamel2 "" >> fake
./snakeToCamel2 one two >> fake
./snakeToCamel2 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash snakeToCamel2 0 "helloWorldAndCoucou" > /dev/null 2>&1

rm -rf snakeToCamel snakeToCamel2 real fake
