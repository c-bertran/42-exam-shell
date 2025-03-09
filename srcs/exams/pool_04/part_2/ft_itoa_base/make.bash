#!/bin/bash

clang -Wall -Werror -Wextra ft_itoa_base.c main.c -o itoaBase || exit 100
./itoaBase "hello world" > real
./itoaBase "" >> real
./itoaBase "    " >> real
./itoaBase 16-789 >> real
./itoaBase +4096 >> real
./itoaBase 8 >> real
./itoaBase 16 >> real
./itoaBase 128 >> real
./itoaBase 1024 >> real
./itoaBase 16384 >> real
./itoaBase 131072 >> real
./itoaBase 1048576 >> real
./itoaBase -1048576 >> real
./itoaBase -131072 >> real
./itoaBase -16384 >> real
./itoaBase -1024 >> real
./itoaBase -128 >> real
./itoaBase -16 >> real

clang -Wall -Werror -Wextra $1/ft_itoa_base/ft_itoa_base.c main.c -o itoaBase2
./itoaBase2 "hello world" > fake
./itoaBase2 "" >> fake
./itoaBase2 "    " >> fake
./itoaBase2 16-789 >> fake
./itoaBase2 +4096 >> fake
./itoaBase2 8 >> fake
./itoaBase2 16 >> fake
./itoaBase2 128 >> fake
./itoaBase2 1024 >> fake
./itoaBase2 16384 >> fake
./itoaBase2 131072 >> fake
./itoaBase2 1048576 >> fake
./itoaBase2 -1048576 >> fake
./itoaBase2 -131072 >> fake
./itoaBase2 -16384 >> fake
./itoaBase2 -1024 >> fake
./itoaBase2 -128 >> fake
./itoaBase2 -16 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash itoaBase2 0 131072 > /dev/null 2>&1

rm -rf itoaBase itoaBase2 real fake
