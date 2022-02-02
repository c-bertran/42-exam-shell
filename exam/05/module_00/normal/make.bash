#!/bin/bash
ID=0
BASE="./$1/module_00"

rm -f valgrind_*.log real_warlock fake_warlock

execute () {
	rm -f real_warlock fake_warlock

	clang++ -Wall -Werror -Wextra -std=c++98 Warlock.cpp testing/$ID.cpp -I ./Warlock.hpp -o real_warlock > /dev/null 2>&1
	clang++ -Wall -Werror -Wextra -std=c++98 $BASE/Warlock.cpp testing/$ID.cpp -I $BASE/Warlock.hpp -o fake_warlock > /dev/null 2>&1
	if [ $? -ne 0 ]
	then
		echo "Failed with $ID.cpp" >> real
		echo "Failed with $ID.cpp" >> fake
	else
		bash leaks.bash real_warlock $ID >> real
		bash leaks.bash fake_warlock $ID >> fake
	fi
}

until [ $ID -gt 4 ]
do
	execute
	ID=$(($ID + 1))
done

diff -y --suppress-common-lines real fake > __diff

rm -f real_warlock fake_warlock real fake
