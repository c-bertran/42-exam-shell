#!/bin/bash

clang -Wall -Werror -Wextra main.c -o doOp || exit 100
./doOp 42 + 25 > real
./doOp 42 "*" 25 >> real
./doOp 42 - 25 >> real
./doOp 42 / 25 >> real
./doOp 42 % 25 >> real
./doOp -244572 + 715644 >> real
./doOp 457845 / -24 >> real
./doOp 42 + 25 + 78 >> real
./doOp 42 + >> real
./doOp >> real

clang -Wall -Werror -Wextra $1/do_op/do_op.c -o doOp2
./doOp2 42 + 25 > fake
./doOp2 42 "*" 25 >> fake
./doOp2 42 - 25 >> fake
./doOp2 42 / 25 >> fake
./doOp2 42 % 25 >> fake
./doOp2 -244572 + 715644 >> fake
./doOp2 457845 / -24 >> fake
./doOp2 42 + 25 + 78 >> fake
./doOp2 42 + >> fake
./doOp2 >> fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash doOp2 0 -244572 + 715644 > /dev/null 2>&1

rm -rf doOp doOp2 real fake
