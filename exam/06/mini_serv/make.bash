#!/bin/bash

CHECKER_PORT=8080
USER_PORT=8081
PID_SERV_REAL=0
PID_SERV_FAKE=0
PID_CLIENT_REAL=0
PID_CLIENT_FAKE=0
declare -i TEST=1
declare -i TESTS=1
#declare -i TESTS=$((1 + $RANDOM % 10))

start_serv () {
	nohup ./real_serv $CHECKER_PORT >/dev/null 2>&1 &
	PID_SERV_REAL=$!
	nohup ./fake_serv $USER_PORT >/dev/null 2>&1 &
	PID_SERV_FAKE=$!
	sleep 5
}
stop_serv () {
	if ps -p $PID_SERV_REAL > /dev/null
	then
		kill $PID_SERV_REAL
	fi
	if ps -p $PID_SERV_FAKE > /dev/null
	then
		kill $PID_SERV_FAKE
	fi
	sleep 5
}

start_client () {
	nohup ./main_client $CHECKER_PORT >> real &
	PID_CLIENT_REAL=$!
	nohup ./main_client $USER_PORT >> fake &
	PID_CLIENT_FAKE=$!
	sleep 5
}
stop_client () {
	if ps -p $PID_CLIENT_REAL > /dev/null
	then
		kill $PID_CLIENT_REAL
	fi
	if ps -p $PID_CLIENT_FAKE > /dev/null
	then
		kill $PID_CLIENT_FAKE
	fi
	sleep 5
}

trim () {
	if [[ $OSTYPE == 'darwin'* ]]
	then
		sed -E -i 's/client [0-9]+/client/g' real
		sed -E -i 's/client [0-9]+/client/g' fake
	else
		sed -r -i 's/client [0-9]+/client/g' real
		sed -r -i 's/client [0-9]+/client/g' fake
	fi
}

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

execute () {
	#declare PIDS
	#declare -i I_PIDS=0
	declare -i TIME=0
	declare -i X=1
	declare -i CLIENTS=1
	#declare -i CLIENTS=$((1 + $RANDOM % 20))
	
	echo "$CLIENTS client(s) ============" | tee -a real | tee -a fake
	until [ $X -gt $CLIENTS ]
	do
		SEED=$((1 + $RANDOM % 100000))
		TIME=$(
			RET=$(./messages $SEED time)
			RET=$(($TIME + $RET - 1))
			echo $RET
		)
		./messages $SEED | ./client $USER_PORT >/dev/null 2>&1 &
		./messages $SEED | ./client $CHECKER_PORT >/dev/null 2>&1 &
		#./messages $SEED | ./client $USER_PORT >/dev/null 2>&1 &
		#PIDS[$I_PIDS]=$!
		#I_PIDS=$(($I_PIDS + 1))
		#./messages $SEED | ./client $CHECKER_PORT >/dev/null 2>&1 &
		#PIDS[$I_PIDS]=$!
		#I_PIDS=$(($I_PIDS + 1))
		X=$(($X + 1))
	done
	progress_bar $TIME
	#for pid in ${PIDS[*]}
	#do
	#	wait $pid
	#done
}

rm -f valgrind_*.log __diff fake_serv real_serv main_client client messages *.out fake real

clang -Wall -Werror -Wextra $1/mini_serv.c -o fake_serv > /dev/null 2>&1
if [ $? -ne 0 ]
then
	echo "Failed compilation"
	exit 1
fi
clang -Wall -Werror -Wextra tests/serv.c -o real_serv > /dev/null 2>&1
clang++ -Wall -Werror -Wextra -std=c++11 tests/client.cpp -D MAIN -o main_client > /dev/null 2>&1
clang++ -Wall -Werror -Wextra -std=c++11 tests/client.cpp -o client > /dev/null 2>&1
clang++ -Wall -Werror -Wextra -std=c++11 tests/messages.cpp -o messages > /dev/null 2>&1

start_serv
start_client
until [ $TEST -gt $TESTS ]
do
	echo -n "============ $TEST/$TESTS | " | tee real | tee fake
	execute
	TEST=$(($TEST + 1))
done
stop_client
stop_serv

#trim
diff -y --suppress-common-lines real fake > __diff

rm -f fake_serv real_serv main_client client messages *.out #fake_* real_*
