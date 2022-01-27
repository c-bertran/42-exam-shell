#!/bin/bash
if [ -z "$2" ]
then
	logFile="valgrind_0.log"
else
	logFile="valgrind_$2.log"
fi

ID=1
ARGS=""
for var in "$@"
do
    if [[ $ID -gt 2 ]]
	then
		ARGS+="${var} "
	fi
	ID=$(($ID + 1))
done

valgrind --tool=memcheck --leak-check=full --leak-resolution=high --show-reachable=yes --track-fds=yes --log-file=$logFile ./$1 $ARGS
