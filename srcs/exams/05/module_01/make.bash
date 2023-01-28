#!/bin/bash
ID=0
BASE="./$1/module_01"

rm -f valgrind_*.log real_warlock fake_warlock

execute () {
	rm -f real_warlock fake_warlock

	clang++ -Wall -Werror -Wextra -std=c++98 \
	ASpell.cpp ATarget.cpp Dummy.cpp Fwoosh.cpp Warlock.cpp testing/$ID.cpp -I ./ -o real_warlock > /dev/null 2>&1
	if [ $? -ne 0 ]
	then
		echo "Failed with $ID.cpp" >> real
	else
		bash leaks.bash real_warlock $ID >> real
	fi

	clang++ -Wall -Werror -Wextra -std=c++98 \
	$BASE/ASpell.cpp $BASE/ATarget.cpp $BASE/Dummy.cpp $BASE/Fwoosh.cpp $BASE/Warlock.cpp testing/$ID.cpp -I $BASE/ -o fake_warlock > /dev/null 2>&1
	if [ $? -ne 0 ]
	then
		echo "Failed with $ID.cpp" >> fake
	else
		bash leaks.bash fake_warlock $ID >> fake
	fi
}

until [ $ID -gt 5 ]
do
	execute
	ID=$(($ID + 1))
done

diff -y --suppress-common-lines real fake > __diff

rm -f real_warlock fake_warlock real fake
