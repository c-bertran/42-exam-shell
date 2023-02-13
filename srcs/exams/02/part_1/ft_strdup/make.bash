#!/bin/bash

clang -Wall -Werror -Wextra ft_strdup.c main.c -o ftStrdup || exit 100
./ftStrdup "hello world" > real
./ftStrdup "" >> real
./ftStrdup "wonderful" >> real
./ftStrdup "wondertime" >> real
./ftStrdup "behavior" >> real
./ftStrdup "  wou    wah   wi" >> real

clang -Wall -Werror -Wextra $1/ft_strdup/ft_strdup.c main.c -o ftStrdup2
./ftStrdup2 "hello world" > fake
./ftStrdup2 "" >> fake
./ftStrdup2 "wonderful" >> fake
./ftStrdup2 "wondertime" >> fake
./ftStrdup2 "behavior" >> fake
./ftStrdup2 "  wou    wah   wi" >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash ftStrdup2 0 "wondertime" > /dev/null 2>&1

rm -rf ftStrdup ftStrdup2 real fake
