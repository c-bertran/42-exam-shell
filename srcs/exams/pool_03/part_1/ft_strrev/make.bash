#!/bin/bash

clang -Wall -Werror -Wextra ft_strrev.c main.c -o ftStrrev || exit 100
./ftStrrev "hello world" "hello world" > real
./ftStrrev "" "" >> real
./ftStrrev "wonderful" "wondertime" >> real
./ftStrrev "wondertime" "wonderful" >> real
./ftStrrev "behavior" "declared" >> real
./ftStrrev "  wou    wah   wi" "  wou    wah  X wi" >> real

clang -Wall -Werror -Wextra $1/ft_strrev/ft_strrev.c main.c -o ftStrrev2
./ftStrrev2 "hello world" "hello world" > fake
./ftStrrev2 "" "" >> fake
./ftStrrev2 "wonderful" "wondertime" >> fake
./ftStrrev2 "wondertime" "wonderful" >> fake
./ftStrrev2 "behavior" "declared" >> fake
./ftStrrev2 "  wou    wah   wi" "  wou    wah  X wi" >> fake

diff -y --suppress-common-lines real fake > __diff

rm -rf ftStrrev ftStrrev2 real fake
