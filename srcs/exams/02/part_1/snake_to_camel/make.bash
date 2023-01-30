#!/bin/bash
set -e

clang -Wall -Werror -Wextra main.c -o snakeToCamel;
./snakeToCamel "hello_world_and_plip" > real
./snakeToCamel "helloWorldAndCoucou" >> real
./snakeToCamel "Wonder_ful_orld" >> real
./snakeToCamel "" >> real
./snakeToCamel one two >> real
./snakeToCamel >> real

clang -Wall -Werror -Wextra $1/snake_to_camel/snake_to_camel.c -o snakeToCamel2;
./snakeToCamel2 "hello_world_and_plip" > fake
./snakeToCamel2 "helloWorldAndCoucou" >> fake
./snakeToCamel2 "Wonder_ful_orld" >> fake
./snakeToCamel2 "" >> fake
./snakeToCamel2 one two >> fake
./snakeToCamel2 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash snakeToCamel2

rm -rf snakeToCamel snakeToCamel2 real fake