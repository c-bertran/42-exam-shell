#!/bin/bash

declare -i USER_PORT=0
declare -i CHECKER_PORT=0
declare -i I=1
declare -i CLIENTS=0
declare -i RETRY=0

build () {
	# C
	clang -Wall -Werror -Wextra $1/mini_serv/mini_serv.c -o fake_serv || exit 101
	clang -Wall -Werror -Wextra tests/serv.c -o real_serv > /dev/null 2>&1 || exit 100
	# C++
	clang++ -Wall -Werror -Wextra -std=c++11 tests/port_checker.cpp -o port_checker > /dev/null 2>&1 || exit 100
	clang++ -Wall -Werror -Wextra -std=c++11 tests/client.cpp -D MAIN -o main_client > /dev/null 2>&1 || exit 100
	clang++ -Wall -Werror -Wextra -std=c++11 tests/client.cpp -o client > /dev/null 2>&1 || exit 100
	clang++ -Wall -Werror -Wextra -std=c++11 tests/messages.cpp -o messages > /dev/null 2>&1 || exit 100
}

start_serv () {
	CLIENTS=$((1 + $RANDOM % 7))

	USER_PORT=$( ./port_checker )
	if [ $USER_PORT -eq -1 ]
	then
		echo "Failed starting user serv"
		exit -1
	fi
	./fake_serv $USER_PORT > /dev/null 2>&1 &

	CHECKER_PORT=$( ./port_checker )
	if [ $CHECKER_PORT -eq -1 ]
	then
		echo "Failed starting real serv"
		exit -1
	fi
	./real_serv $CHECKER_PORT > /dev/null 2>&1 &
	./main_client $USER_PORT >> fake &
	./main_client $CHECKER_PORT >> real &
	echo "Test $I >>>> $CLIENTS client(s)" | tee -a fake | tee -a real
	echo "Wait 4 secondes for handle base system"

	sleep 4
}

stop_serv () {
	pkill -INT client > /dev/null 2>&1 || true
	pkill -INT leaks.bash > /dev/null 2>&1 || true
	pkill -9 _serv > /dev/null 2>&1 || true
}

first_check () {
	echo "First check"

	touch fake real

	./fake_serv >> fake 2>&1; echo "$?" >> fake
	./real_serv >> real 2>&1; echo "$?" >> real

	./fake_serv 45 54 >> fake 2>&1; echo "$?" >> fake
	./real_serv 45 54 >> real 2>&1; echo "$?" >> real

	TEMP_PORT=$( ./port_checker )
	if [ $TEMP_PORT -eq -1 ]
	then
		echo "Failed get temp port"
		exit -1
	fi

	./real_serv $TEMP_PORT >> real 2>&1 &
	sleep 2
	./real_serv $TEMP_PORT >> real 2>&1
	echo "$?" >> real
	pkill -9 _serv > /dev/null 2>&1

	./fake_serv $TEMP_PORT >> fake 2>&1 &
	sleep 2
	./fake_serv $TEMP_PORT >> fake 2>&1
	echo "$?" >> fake
	pkill -9 _serv > /dev/null 2>&1

	diff -y --suppress-common-lines real fake > __diff
	if [ ! $? -eq 0 ]
	then
		echo "Diff failed at error, stop testing"
		exit 127
	else 
		echo "Diff ok, continue"
	fi
}

check_leak() {
	echo "Check leaks"
	TEMP_PORT=$( ./port_checker )
	if [ $TEMP_PORT -eq -1 ]
	then
		echo "Failed starting leaks serv"
		exit -1
	fi

	./fake_serv $TEMP_PORT > /dev/null 2>&1 &
	bash leaks.bash main_client $I $TEMP_PORT > /dev/null 2>&1 &
	sleep 4
	./messages 42 | ./client $TEMP_PORT >/dev/null &
	PID_TEST=$!
	until ! ps -p ${PID_TEST} &>/dev/null
	do
		sleep 1
	done
	stop_serv
}

execute () {
	declare -i X=1
	declare -i CLIENTS_ID=0
	declare -a CLIENTS_PID=()

	start_serv
	echo -n "["
	until [ $X -gt $CLIENTS ]
	do
		declare -i SEED=$((1 + $RANDOM % 100000))
		echo -n " $X "
		
		./messages $SEED | ./client $USER_PORT >/dev/null &
		CLIENTS_PID[CLIENTS_ID]=$!
		CLIENTS_ID=$(($CLIENTS_ID + 1))
		
		./messages $SEED | ./client $CHECKER_PORT >/dev/null &
		CLIENTS_PID[CLIENTS_ID]=$!
		CLIENTS_ID=$(($CLIENTS_ID + 1))
		
		X=$(($X + 1))
		sleep 3
	done
	echo "]"
	until [ ${#CLIENTS_PID[@]} -eq 0 ]
	do
		for i in "${!CLIENTS_PID[@]}"
		do
			if ! ps -p ${CLIENTS_PID[$i]} &>/dev/null
			then
				unset CLIENTS_PID[$i]
			fi
		done
	done
	sleep 4
	stop_serv

	cp real real_$I
	cp fake fake_$I
	diff -y --suppress-common-lines real fake > __diff_$I
	if [ ! $? -eq 0 ]
	then
		RETRY=$(($RETRY + 1))
		echo "Diff failed at test $I, try $RETRY/2"
		if [ $RETRY -lt 2 ]
		then
			rm -f real fake real_$I fake_$I
			touch fake real
			execute
		else
			exit $I
		fi
	else 
		echo "Diff ok, continue"
	fi
}

rm -f fake* real* main_client client messages port_checker *.out __diff* temp* *.log
build $1
first_check
check_leak
until [ $I -gt 5 ]
do
	rm -f fake real
	touch fake real
	RETRY=0
	execute
	I=$(($I + 1))
done
rm -f fake* real* main_client client messages port_checker *.out temp*
