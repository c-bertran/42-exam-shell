declare -i USER_PORT=0
declare -i CHECKER_PORT=0
declare -i TIME=0
declare -i X=1
declare -i I=1
declare -i CLIENTS=0

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

rm -f valgrind_*.log __diff* fake* real* main_client client messages port_checker *.out

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

start_serv () {
	declare PID=0
	USER_PORT=$( ./port_checker )
	if [ $USER_PORT -eq -1 ]
	then
		echo "Failed starting user serv"
		exit -1
	fi
	./fake_serv $USER_PORT >/dev/null 2>&1 &
	until pids=$(pidof fake_serv)
	do
		sleep 1
	done

	CHECKER_PORT=$( ./port_checker )
	if [ $CHECKER_PORT -eq -1 ]
	then
		echo "Failed starting real serv"
		exit -1
	fi
	./real_serv $CHECKER_PORT >/dev/null 2>&1 &
	until pids=$(pidof real_serv)
	do
		sleep 1
	done

	./main_client $USER_PORT >> fake &
	until pids=$(pidof main_client $USER_PORT)
	do
		sleep 1
	done

	./main_client $CHECKER_PORT >> real &
	until pids=$(pidof main_client $CHECKER_PORT)
	do
		sleep 1
	done

	echo "Test $I >>>> $CLIENTS client(s)" | tee -a fake | tee -a real
}

stop_serv () {
	killall -w -9 main_client || true
	killall -w -9 *_serv || true
}

execute () {
	CLIENTS=$((1 + $RANDOM % 7))
	start_serv
	until [ $X -gt $CLIENTS ]
	do
		declare -i SEED=$((1 + $RANDOM % 100000))
		declare -i RET=$(./messages $SEED time)
		if [ $RET -gt $TIME ]
		then
			TIME=$RET
		fi
		#./messages $SEED | ./client $USER_PORT >/dev/null 2>&1 &
		#./messages $SEED | ./client $CHECKER_PORT >/dev/null 2>&1 &
		./messages $SEED | ./client $USER_PORT >/dev/null &
		./messages $SEED | ./client $CHECKER_PORT >/dev/null &
		echo "$SEED-$X"
		X=$(($X + 1))
	done
	TIME=$(($TIME + 5))
	progress_bar $TIME
	stop_serv
	diff -y --suppress-common-lines real fake > __diff
	cp real real_$I
	cp fake fake_$I
	if [ ! $? -eq 0 ]
	then
		echo "Diff failed, stop testing"
		exit $I
	else 
		echo "Diff ok, continue"
	fi
}

touch fake real
until [ $I -gt 5 ]
do
	execute
	> fake
	> real
	I=$(($I + 1))
done

rm -f fake_serv real_serv main_client client messages port_checker *.out
#rm -f fake* real* main_client client messages port_checker *.out
