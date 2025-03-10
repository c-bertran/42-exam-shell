#!/bin/bash

clang -Wall -Werror -Wextra ft_strcmp.c main.c -o ftStrcmp || exit 100
./ftStrcmp "hello world" "hello world" > real
./ftStrcmp "" "" >> real
./ftStrcmp "wonderful" "wondertime" >> real
./ftStrcmp "wondertime" "wonderful" >> real
./ftStrcmp "behavior" "declared" >> real
./ftStrcmp "  wou    wah   wi" "  wou    wah  X wi" >> real

clang -Wall -Werror -Wextra $1/ft_strcmp/ft_strcmp.c main.c -o ftStrcmp2
./ftStrcmp2 "hello world" "hello world" > fake
./ftStrcmp2 "" "" >> fake
./ftStrcmp2 "wonderful" "wondertime" >> fake
./ftStrcmp2 "wondertime" "wonderful" >> fake
./ftStrcmp2 "behavior" "declared" >> fake
./ftStrcmp2 "  wou    wah   wi" "  wou    wah  X wi" >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash ftStrcmp2 0 "wondertime" "wonderful" > /dev/null 2>&1

rm -rf ftStrcmp ftStrcmp2 real fake
