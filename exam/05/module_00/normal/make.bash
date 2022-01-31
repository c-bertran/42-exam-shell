clang++ -Wall -Werror -Wextra Warlock.cpp main.cpp -I ./ -o real_warlock
clang++ -Wall -Werror -Wextra $1/module_00/Warlock.cpp main.cpp -I ./$1/module_00/ -o fake_warlock
