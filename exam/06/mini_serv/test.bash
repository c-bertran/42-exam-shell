declare -i USER_PORT=0
declare -i CHECKER_PORT=0

#declare PIDS
#declare -i I_PIDS=0
declare -i TIME=0
declare -i X=1
declare -i CLIENTS=2
#declare -i CLIENTS=$((1 + $RANDOM % 20))

progress_bar () {
	INC=$(((100 + $1 - 1)/$1))
	for ((k = 0; k <= $1 ; k++))
	do
		echo -n "[ "
		for ((i = 0 ; i <= k; i++)); do echo -n "#"; done
		for ((j = i ; j <= $1 ; j++)); do echo -n " "; done
		v=$(($k * $INC))
		if [ $v -gt 100 ]
		then
			v=100
		fi
		echo -n " ] "
		echo -n "$v %" $'\r'
		sleep 1
	done
	echo
}

rm -f valgrind_*.log __diff fake_serv real_serv main_client client messages *.out fake real _SEED_

clang -Wall -Werror -Wextra $1/mini_serv.c -o fake_serv > /dev/null 2>&1
if [ $? -ne 0 ]
then
	echo "Failed compilation"
	exit 1
fi
clang -Wall -Werror -Wextra tests/serv.c -o real_serv > /dev/null 2>&1
clang++ -Wall -Werror -Wextra -std=c++11 tests/port_checker.cpp -o port_checker > /dev/null 2>&1
clang++ -Wall -Werror -Wextra -std=c++11 tests/client.cpp -D MAIN -o main_client > /dev/null 2>&1
clang++ -Wall -Werror -Wextra -std=c++11 tests/client.cpp -o client > /dev/null 2>&1
clang++ -Wall -Werror -Wextra -std=c++11 tests/messages.cpp -o messages > /dev/null 2>&1

USER_PORT=$( ./port_checker )
if [ $USER_PORT -eq -1 ]
then
	echo "Failed starting user serv"
	exit -1
fi
./fake_serv $USER_PORT >/dev/null 2>&1 &
PID_1=$!
CHECKER_PORT=$( ./port_checker )
if [ $CHECKER_PORT -eq -1 ]
then
	echo "Failed starting real serv"
	exit -1
fi
./real_serv $CHECKER_PORT >/dev/null 2>&1 &
PID_2=$!
sleep 5

./main_client $USER_PORT >> fake &
PID_3=$!
./main_client $CHECKER_PORT >> real &
PID_4=$!
sleep 5

echo "$CLIENTS client(s) ============"
until [ $X -gt $CLIENTS ]
do
	declare -i SEED=$((1 + $RANDOM % 100000))
	declare -i RET=$(./messages $SEED time)
	echo "$SEED" >> _SEED_
	if [ $RET -gt $TIME ]
	then
		TIME=$RET
	fi
	./messages $SEED | ./client $USER_PORT >/dev/null 2>&1 &
	echo $!
	./messages $SEED | ./client $CHECKER_PORT >/dev/null 2>&1 &
	echo $!
	X=$(($X + 1))
done
TIME=$(($TIME + 5))
progress_bar $TIME

kill $PID_1 $PID_2 $PID_3 $PID_4