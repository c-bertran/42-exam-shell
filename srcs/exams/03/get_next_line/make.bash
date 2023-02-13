#!/bin/bash

rm -rf fake real real_gnl fake_gnl

gnl_test () {
	clang -Wall -Werror -Wextra -D BUFFER_SIZE=$1 get_next_line.c main.c -I ./ -o real_gnl || exit 100;
	clang -Wall -Werror -Wextra -D BUFFER_SIZE=$1 $2/get_next_line/get_next_line.c main.c -I ./$2/get_next_line/ -o fake_gnl
	# REAL =====================================================================
	./real_gnl files/41_no_nl >> real
	./real_gnl files/41_with_nl >> real
	./real_gnl files/42_no_nl >> real
	./real_gnl files/42_with_nl >> real
	./real_gnl files/43_no_nl >> real
	./real_gnl files/43_with_nl >> real
	./real_gnl files/alternate_line_nl_no_nl >> real
	./real_gnl files/alternate_line_nl_with_nl >> real
	./real_gnl files/big_line_no_nl >> real
	./real_gnl files/big_line_with_nl >> real
	./real_gnl files/empty >> real
	./real_gnl files/multiple_line_no_nl >> real
	./real_gnl files/multiple_line_with_nl >> real
	./real_gnl files/multiple_nlx5 >> real
	./real_gnl files/nl >> real
	# FAKE =====================================================================
	./fake_gnl files/41_no_nl >> fake
	./fake_gnl files/41_with_nl >> fake
	./fake_gnl files/42_no_nl >> fake
	./fake_gnl files/42_with_nl >> fake
	./fake_gnl files/43_no_nl >> fake
	./fake_gnl files/43_with_nl >> fake
	./fake_gnl files/alternate_line_nl_no_nl >> fake
	./fake_gnl files/alternate_line_nl_with_nl >> fake
	./fake_gnl files/big_line_no_nl >> fake
	./fake_gnl files/big_line_with_nl >> fake
	./fake_gnl files/empty >> fake
	./fake_gnl files/multiple_line_no_nl >> fake
	./fake_gnl files/multiple_line_with_nl >> fake
	./fake_gnl files/multiple_nlx5 >> fake
	./fake_gnl files/nl >> fake
}

gnl_test -1 $1
rm -rf real_gnl fake_gnl

gnl_test 0 $1
rm -rf real_gnl fake_gnl

gnl_test 1 $1
rm -rf real_gnl fake_gnl

gnl_test 215600 $1
rm -rf real_gnl fake_gnl

gnl_test 42 $1

diff -y --suppress-common-lines real fake >> __diff
bash leaks.bash fake_gnl 0 files/multiple_line_with_nl > /dev/null 2>&1

rm -rf fake real real_gnl fake_gnl
