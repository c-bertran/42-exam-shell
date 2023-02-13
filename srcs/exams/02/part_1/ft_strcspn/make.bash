#!/bin/bash

clang -Wall -Werror -Wextra ft_strcspn.c main.c -o ftStrcspn || exit 100
./ftStrcspn "hello world" "hello world" > real
./ftStrcspn "" "" >> real
./ftStrcspn "wonderful" "wondertime" >> real
./ftStrcspn "wondertime" "wonderful" >> real
./ftStrcspn "behavior" "declared" >> real
./ftStrcspn "  wou    wah   wi" "  wou    wah  X wi" >> real

clang -Wall -Werror -Wextra $1/ft_strcspn/ft_strcspn.c main.c -o ftStrcspn2
./ftStrcspn2 "hello world" "hello world" > fake
./ftStrcspn2 "" "" >> fake
./ftStrcspn2 "wonderful" "wondertime" >> fake
./ftStrcspn2 "wondertime" "wonderful" >> fake
./ftStrcspn2 "behavior" "declared" >> fake
./ftStrcspn2 "  wou    wah   wi" "  wou    wah  X wi" >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash ftStrcspn2 0 "wondertime" "wonderful" > /dev/null 2>&1

rm -rf ftStrcspn ftStrcspn2 real fake
