<h1 align="center">
  <img height="100" src="md/logo.svg" alt=""><br>
	Practice like a boss
</h1>

<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/c-bertran/examshell/.github/workflows/release.yml?branch=main&style=flat-square"/> <img alt="GitHub" src="https://img.shields.io/github/license/c-bertran/examshell?style=flat-square"> ![GitHub repo size](https://img.shields.io/github/repo-size/c-bertran/examshell?style=flat-square) <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/c-bertran/examshell?style=flat-square">

<img src="md/main.gif"></img>

<h1>Examshell will allow you to practice to be perfectly ready for the 42 exams</h1>

- [Exams](#exams)
- [Setup](#setup)
- [How to use](#how-to-use)
	- [Arguments](#arguments)
- [Config examshell](#config-examshell)
- [Create or install custom exam](#create-or-install-custom-exam)
	- [Install a custom exam](#install-a-custom-exam)
	- [Create a custom exam](#create-a-custom-exam)
	- [Exercice structure](#exercice-structure)
- [Disclaimer](#disclaimer)
- [License](#license)

This one will have the same behaviors as the real examshell:
- Several exercises can be available per level, chosen randomly
- Your rendering must be committed via git
- A moulinette will go over your code to check for forbidden functions, and possible leaks
- Then your program will be compared with the _real_ program

Some options have been added:
- Multilingual interface (currently available in `French` and `English`)
- Two options:
  - `Infinite`: Disables the timer, so the time is unlimited
  - `Doom`: To make your practice harder, if you fail the whole rendering folder is reset, as well as the associated git

## Exams
The following exams are available natively:
- Exam 02
- Exam 03
- Exam 04
- Exam 05
- Exam 06
- Old exam 03

## Setup
Download the ![latest version](https://github.com/c-bertran/examshell/releases/latest) of the software. This one is available for MacOS and Linux

## How to use
Launch your favorite command prompt, and simply run the program:
```sh
./examshell
```

If a rights problem occurs during the execution, make the following command:
```sh
chmod +x examshell
```

### Arguments

| args | definition |
| --- | --- |
| -C or --custom | Create the folder that can contain the reviews created by other people, and also the configuration file |


## Config examshell
You can configure the behavior of examshell via the config.json file in the exams folder.
It has the following options:
```json
{
	"checkUpdate": true,
	"checkLib": true,
	"signature": true,
	"exam": "exam_02",
	"options": {
		"doom": false,
		"infinite": false,
		"lang": "en_US"
	}
}
```

- checkUpdate `boolean` : Checks if a new version is available
- checkLib `boolean` : Checks if the necessary libraries are installed
- signature `boolean` : Print the application's logo and signature
- exam `string` : Id of the exam 
- options.doom `boolean` : All work and git is reset if grademe failed
- options.infinite `boolean` : There is no time limit anymore
- options.lang `string` : Selected lang ('en_US', 'fr_FR')

## Create or install custom exam
Starting with version `0.3.0` examshell allows you to create your own exams in a simple and concise way.
If you want to share your exam, don't hesitate to open a issue with the exam label so that it can be added to a list.

### Install a custom exam
1. Create a `exams` directory in the root of the application, or launch `./examshell -C`
2. Paste exam in this directory
3. Start application, if exam is correct, it will appear in the selection list

### Create a custom exam
1. Create a `exams` directory in the root of the application, or launch `./examshell -C`
2. Create a folder that will contain your exam, for example `hello`
3. In this folder, create a file named `definition.js`
   This file will contain all the information necessary for Examshell to know how it works.

	 ### Main structure
	 Its structure is based on a precise interface, for example:
	 ```javascript
	{
		"id": "my_custom_exam",
		"dirName": "hello",
		"name": {
			"en_US": "My exam",
			"fr_FR": "Mon examen"
		},
		"goal": 100,
		"time": "3h",
		"exercices": [
			[
				...
			],
			...
		]
	}
	 ```
	 Let's go into more detail:
	 - `id` : the id of your exam
	 - `dirName` : the name of the folder in which your exam is located
	 - `name` : the different names of this one in the different languages
	 - `goal` : the number of points needed by the user to complete your exam
	 - `time` : the time you want to give the user to complete your exam. Accept days `d`, hours `h`, minutes `m`, seconds `s` (`3d 14h 41m 17s`)
	 - `exercices` : the list containing your exercises
     This list contains sub-lists containing your exams. Each sub-list represents a step in your exam. For example two sub-lists represent two steps. In each sub-list, one exam is randomly selected

    ---

   ### Exercice structure
	 Let's go into more detail on the definition of an exercise:
	  ```javascript
		{
			...
			"exercices": [
				[
					{
						"id": "one",
						"dir"?: "subdir",
						"name": {
							"en_US": "one",
							"fr_FR": "two"
						},
						"exponent": 2,
						"trace": true,
						"allowed_functions": [ "write", "free", "malloc" ],
						"moulinette": true,
						"leaks": true,
						"copy": {
							"user": ["hi.png"],
							"check": ["test.c"]
						}
					},
					...
				],
			]
		}
	 ```
	 - `id` : the id of your exercise, also represents the name of the folder in which it is located
	 - `dir` *optional*: the name of the folder in which your exercise is located
	 - `name` : the different names of this one in the different languages
	 - `exponent` : represents the number of points you want to give to the exercise. For example if your goal is 100 and you want two exercises, the exponent will be 2
	 - `trace` : the trace will be displayed in case of an error
	 - `allowed_functions` : a list of strings representing the names of the functions you want to allow in the code
	 - `moulinette` : pass the moulinette on the code
	 - `leaks` : check if the program does not leaks or has no file descriptor open
	 - `copy` : Represents the list of files of directories that will be copied to the user via the user argument, or during the correction via the check argument. Accept glob string

	  ---

	### Exercice directory structure
	```shell
	one
	├─ subjects/
	│  ├─ en_US
	│  ├─ fr_FR
	├─ make.bash
	```
	
	An exercise has at least a `subjects` folder containing the subjects in several languages, and a file named `make.bash`, which will be executed by examshell to check the exercise. You can add all the files and folders you want. These are the files and folders that are accessible via the copy option in the exercise definition.
	The first argument (*$1*) sent to `make.bash` is the path to the user's rendering folder, so you can compile his program :
	```bash
	gcc -Wall -Werror -Wextra $1/hello/hello.c -o my_exec
	```

	### *leaks.bash*
	During the correction, a bash script named `leaks.bash` is copied into the correction folder.
  This script as its name indicates will generate logs of valgrind. This one accepts two arguments minimum: first the executable you want to test, second the identifier of your current test (for example if you make 3 tests, you will be able to generate the log 1, 2 and 3). All other arguments will be passed to your program
	For exemple:
	```shell
  	bash leaks.bash my_exec $ID ...
	```

## Disclaimer
The exams available are based as closely as possible on the official exams at 42, however there may be some differences.
If you find a significant difference, don't hesitate to open an issue.

## License
	Examshell Copyright (C) 2022 - ...  Clément Bertrand
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
