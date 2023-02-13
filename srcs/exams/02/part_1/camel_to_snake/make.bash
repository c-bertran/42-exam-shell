#!/bin/bash

clang -Wall -Werror -Wextra main.c -o camelToSnake || exit 100
./camelToSnake "helloWorldAndPlip" > real
./camelToSnake "hello_world_and_coucou" >> real
./camelToSnake "wonderFulWorld" >> real
./camelToSnake "" >> real
./camelToSnake one two >> real
./camelToSnake >> real

clang -Wall -Werror -Wextra $1/camel_to_snake/camel_to_snake.c -o camelToSnake2
./camelToSnake2 "helloWorldAndPlip" > fake
./camelToSnake2 "hello_world_and_coucou" >> fake
./camelToSnake2 "wonderFulWorld" >> fake
./camelToSnake2 "" >> fake
./camelToSnake2 one two >> fake
./camelToSnake2 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash camelToSnake2 0 "hello_world_and_coucou" > /dev/null 2>&1

rm -rf camelToSnake camelToSnake2 real fake
