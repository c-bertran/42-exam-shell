<h1 align="center">🚀 Create a custom challenge 🚀</h1>

- [Development](#development)
- [Cli](#cli)
- [Manual](#manual)
	- [Main structure](#main-structure)
	- [Exercise structure](#exercise-structure)
- [Exercise directory structure](#exercise-directory-structure)
- [*leaks.bash*](#leaksbash)
- [More info](#more-info)

---

## Development
To download this git repository and start a development environment, follow these steps:

**Mandatory**: Git, Clang & GCC, Make, Valgrind

1. **Clone the repository**:
	```shell
	git clone https://github.com/c-bertran/codeshell.git
	cd codeshell
	```

2. **Install dependencies**:
	Ensure you have all necessary dependencies installed.
	```shell
	npm install
	```

4. **Run the development server**:
	Start the development to begin working on the project, auto rebuild if source code change
	```shell
	npm run watch
	```

5. **Open the project in your code editor**:
	Open the project directory in your preferred code editor to start making changes.

6. **Build**:
	Ensure everything is working correctly by running the debug pkg
	```shell
	npm run build // Create a bundle version
	npm run pkg:debug // Build a debug executable
	npm run pkg:build // Build the final executable
	```

You are now ready to start developing!

## Cli
Starting with version *0.3.1*, a cli for creating a challenge boilerplate is available. Simply run codeshell with the `--new` or `-N` :
```shell
./codeshell --new
```

## Manual

1. Create a `challenges` directory in the root of the application, or launch `./codeshell -C`
2. Create a folder that will contain your challenge, for example `hello`
3. In this folder, create a file named `definition.json`.
   This file will contain all the information necessary for CodeShell to know how it works.

### Main structure
Its structure is based on a precise interface, for example:
```javascript
{
	"id": "my_custom_challenge",
	"dirName": "hello",
	"name": {
		"en_US": "My challenge",
		"fr_FR": "Mon challenge"
	},
	"goal": 100,
	"time": "3h",
	"exercises": [
		[
			...
		],
		...
	]
}
```
Let's go into more detail:
- `id` : the id of your challenge
- `dirName` : the name of the folder in which your challenge is located
- `name` : the different names of this one in the different languages
- `goal` : the number of points needed by the user to complete your challenge
- `time` : the time you want to give the user to complete your challenge. Accept days `d`, hours `h`, minutes `m`, seconds `s` (`3d 14h 41m 17s`)
- `exercises` : the list containing your exercises.
  This list contains sub-lists containing your exercises. Each sub-list represents a step in your challenge. For example two sub-lists represent two steps. In each sub-list, one exercise is randomly selected

### Exercise structure
Let's go into more detail on the definition of an exercise:

```javascript
{
	...
	"exercises": [
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
- `exponent` : represents the number of points you want to give to the exercise. For example if your goal is 100 and you want two exercises, the exponent will be 2. If you not defined it, is calculed automatically (number of exercise passes throughout the challenge)
- `trace` : the trace will be displayed in case of an error
- `allowed_functions` : a list of strings representing the names of the functions you want to allow in the code
- `moulinette` : pass the moulinette on the code
- `leaks` : check if the program does not leaks or has no file descriptor open
- `copy` : Represents the list of files of directories that will be copied to the user via the user argument, or during the correction via the check argument. Accept glob string

---

## Exercise directory structure
```shell
one
├─ subjects/
│  ├─ en_US
│  ├─ fr_FR
├─ make.bash
```
	
An exercise has at least a `subjects` folder containing the subjects in several languages, and a file named `make.bash`, which will be executed by codeshell to check the exercise. You can add all the files and folders you want. These are the files and folders that are accessible via the copy option in the exercise definition.
The first argument (*$1*) sent to `make.bash` is the path to the user's rendering folder, so you can compile his program :
```bash
clang -Wall -Werror -Wextra $1/hello/hello.c -o my_exec
```

## *leaks.bash*
During the correction, a bash script named `leaks.bash` is copied into the correction folder.
This script as its name indicates will generate logs of valgrind. This one accepts two arguments minimum: first the executable you want to test, second the identifier of your current test (for example if you make 3 tests, you will be able to generate the log 1, 2 and 3). All other arguments will be passed to your program
For exemple:
```shell
bash leaks.bash my_exec $ID ...
```

---

## More info
1. To test your challenge, simply launch codeshell and select your challenge from the list. To save time, configure the `config.json` file by specifying your challenge ID.
2. Your challenge looks great and you want to add it to codeshell ? Open an issue with the challenge flag, and you will be in the list of contributors.
3. Any questions ? Do not hesitate to ask your questions, I will answer them as soon as possible.
