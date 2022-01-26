#!/bin/bash

#!/bin/bash
CAT_PATH=$(type -a cat | grep -Eo "is /.*" | grep -Eo "/.*")
GREP_PATH=$(type -a grep | grep -Eo "is /.*" | grep -Eo "/.*")
ECHO_PATH=$(type -a echo | grep -Eo "is /.*" | grep -Eo "/.*")
LS_PATH=$(type -a ls | grep -Eo "is /.*" | grep -Eo "/.*")
ID=0

rm -f valgrind_*.log real_microshell fake_microshell real fake
clang -Wall -Werror -Wextra microshell.c -o real_microshell
clang -Wall -Werror -Wextra render/microshell/*.c -I ./render/microshell/ -o fake_microshell

execute () {
	echo $@ >> real
	timeout 5s bash leaks.bash real_microshell $ID $@ >> real &
	pid=$(pgrep -f leaks.bash)
	wait $pid 2>/dev/null

	echo $@ >> fake
	timeout 5s bash leaks.bash fake_microshell $ID $@ >> fake &
	pid=$(pgrep -f leaks.bash)
	wait $pid 2>/dev/null

	ID=$(($ID + 1))
}

execute $LS_PATH
execute $CAT_PATH microshell.c
execute $LS_PATH microshell.c
execute $LS_PATH salut
execute ";"
execute ";" ";"
execute ";" ";" $ECHO_PATH OK
execute ";" ";" $ECHO_PATH OK ";"
execute ";" ";" $ECHO_PATH OK ";" ";"
execute ";" ";" $ECHO_PATH OK ";" ";" ";" $ECHO_PATH OK
execute $LS_PATH "|" $GREP_PATH microshell
execute $LS_PATH "|" $GREP_PATH microshell "|" $GREP_PATH micro
execute $LS_PATH "|" $GREP_PATH microshell "|" $GREP_PATH micro "|" $GREP_PATH shell "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro
execute $LS_PATH "|" $GREP_PATH microshell "|" $GREP_PATH micro "|" $GREP_PATH shell "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH micro "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell "|" $GREP_PATH shell
execute $LS_PATH ewqew "|" $GREP_PATH micro "|" $CAT_PATH -n ";" $ECHO_PATH dernier ";" $ECHO_PATH
execute $LS_PATH "|" $GREP_PATH micro "|" $CAT_PATH -n ";" $ECHO_PATH dernier ";" $ECHO_PATH ftest ";"
execute $ECHO_PATH ftest ";" $ECHO_PATH ftewerwerwerst ";" $ECHO_PATH werwerwer ";" $ECHO_PATH qweqweqweqew ";" $ECHO_PATH qwewqeqrtregrfyukui ";"
execute $LS_PATH ftest ";" $LS_PATH ";" $LS_PATH werwer ";" $LS_PATH microshell.c ";" $LS_PATH microshell.c ";"
execute $LS_PATH "|" $GREP_PATH micro ";" $LS_PATH "|" $GREP_PATH micro ";" $LS_PATH "|" $GREP_PATH micro ";" $LS_PATH "|" $GREP_PATH micro ";"
execute $CAT_PATH microshell.c "|" $GREP_PATH a "|" $GREP_PATH b ";" $CAT_PATH microshell.c ";"
execute $CAT_PATH microshell.c "|" $GREP_PATH a "|" $GREP_PATH w ";" $CAT_PATH microshell.c ";"
execute $CAT_PATH microshell.c "|" $GREP_PATH a "|" $GREP_PATH w ";" $CAT_PATH microshell.c
execute $CAT_PATH microshell.c ";" $CAT_PATH microshell.c "|" $GREP_PATH a "|" $GREP_PATH b "|" $GREP_PATH z ";" $CAT_PATH microshell.c
execute ";" $CAT_PATH microshell.c ";" $CAT_PATH microshell.c "|" $GREP_PATH a "|" $GREP_PATH b "|" $GREP_PATH z ";" $CAT_PATH microshell.c
execute blah "|" $ECHO_PATH OK
execute blah "|" $ECHO_PATH OK ";"

diff -y --suppress-common-lines real fake > __diff

rm -freal_microshell fake_microshell real fake
