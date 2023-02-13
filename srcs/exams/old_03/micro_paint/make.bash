#!/bin/bash

clang -Wall -Werror -Wextra -lm ./$1/micro_paint/*.c -I ./$1/micro_paint/ -o ./fake_micro_paint
clang -Wall -Werror -Wextra -lm micro_paint.c -o ./real_micro_paint || exit 100

test() {
	./$1 >> $2
	./$1 one >> $2
	./$1 one two >> $2
	./$1 make.bash >> $2
	./$1 operation/5-3 two >> $2
	./$1 operation/5-3 >> $2
	./$1 operation/10-10 >> $2
	./$1 operation/100-100 >> $2
	./$1 operation/simple >> $2
	./$1 corrects/1 >> $2
	./$1 corrects/2 >> $2
	./$1 corrects/3 >> $2
}

test real_micro_paint real
test fake_micro_paint fake

diff -y --suppress-common-lines real fake > __diff
bash leaks.bash fake_micro_paint 0 corrects/3

rm -rf fake real corrects operations micro_paint.c fake_micro_paint real_micro_paint
