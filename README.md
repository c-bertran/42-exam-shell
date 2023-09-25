<h1 align="center">
  <img height="100" src="md/logo.svg" alt=""><br>
	Practice like a boss
</h1>

<h1 align="center">Examshell will allow you to practice to be perfectly ready for the 42 exams</h1>

<img alt="Workflow Status" src="https://img.shields.io/github/actions/workflow/status/c-bertran/42-exam-shell/.github/workflows/release.yml?style=flat-square"/> <img alt="License" src="https://img.shields.io/github/license/c-bertran/42-exam-shell?style=flat-square"> <img alt="Repo size" src="https://img.shields.io/github/repo-size/c-bertran/42-exam-shell?style=flat-square" /> <img alt="Language count" src="https://img.shields.io/github/languages/count/c-bertran/42-exam-shell?style=flat-square">

<img src="md/main.gif"></img>

- [Exams](#exams)
- [Setup](#setup)
- [How to use](#how-to-use)
	- [Arguments](#arguments)
	- [Dependencies](#dependencies)
- [Config examshell](#config-examshell)
- [Create or install custom exam](#create-or-install-custom-exam)
	- [Install a custom exam](#install-a-custom-exam)
	- [Create a custom exam](#create-a-custom-exam)
- [Contributor](#contributor)
- [Disclaimer](#disclaimer)
- [License](#license)

### *⚠️ Pool exams and new exams are being added, as well as the possibility of practicing Javascript and Typescript. ⚠️*

This one will have the same behaviors as the real examshell:
- Updated with the new version of the exam in April 2022
- Several exercises can be available per level, chosen randomly
- Waiting times for correction are exponential
- Your rendering must be committed via git
- A moulinette will go over your code to check for forbidden functions, and possible leaks
- A trace is available when the exercise allows it
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
Download the <a href="https://github.com/c-bertran/42-exam-shell/releases/latest">latest version</a> of the software. This one is available for MacOS and Linux

## How to use
Launch your favorite command prompt, and simply run the program:
```sh
./examshell
```

If a rights problem occurs during the execution, make the following command:
```sh
chmod +x examshell && ./examshell
```

### Arguments
| Args | Definition |
| --- | --- |
| -C or --custom | Create the folder that can contain the *exams* created by other people, and also the configuration file |
| -N or --new | Launch the cli to create the boilerplate for a new exam |

### Dependencies
Examshell is dependent on several external software. Under Linux, the installation can be done by the software itself at startup. However under MacOS you will have to install them yourself. Here is the list with their versions to help you
| Software | Version |
| --- | --- |
| bash | `>= 3.2` |
| clang | `>= 10.0` |
| git | `>= 2.10` |
| valgrind | `>= 3.10` |

## Config examshell
You can configure the behavior of examshell via the `config.json` file in the *exams* folder.
It has the following options:
```json
{
	"checkUpdate": true,
	"checkLib": true,
	"signature": true,
	"exam": "exam_02",
	"lang": "en_US",
	"options": {
		"doom": false,
		"infinite": false,
	}
}
```

- checkUpdate `boolean` : Checks if a new version is available
- checkLib `boolean` : Checks if the necessary libraries are installed
- signature `boolean` : Print the application's logo and signature
- exam `string` : Id of the exam
- lang `string` : Selected lang ('en_US', 'fr_FR')
- options.doom `boolean` : All work and git is reset if grademe failed
- options.infinite `boolean` : There is no time limit anymore

## Create or install custom exam
Starting with version `0.3.0` examshell allows you to create your own exams in a simple and concise way.
If you want to share your exam, don't hesitate to open a issue with the exam label so that it can be added to a list.

### Install a custom exam
1. Create a `exams` directory in the root of the application, or launch `./examshell -C`
2. Paste custom exam in this directory
3. Start application, if exam is correct, it will appear in the selection list

### Create a custom exam
You can create custom exam by adding new exercises: [Contributing](CONTRIBUTING.md)

## Contributor
Thanks to you and your help, examshell is getting better every day. I would like to thank those people who gave their time 🧡

<div align="center">
	<a href="https://github.com/Filoji">
		<img alt="Filoji" width="70" style="border-radius: 50%" src="https://avatars.githubusercontent.com/u/67588131?v=4" />
	</a>
	<a href="https://github.com/B-ki">
		<img alt="B-ki" width="70" style="border-radius: 50%" src="https://avatars.githubusercontent.com/u/87602480?s=200&v=4" />
	</a>
	<a href="https://github.com/pulgamecanica">
		<img alt="pulgamecanica" width="70" style="border-radius: 50%" src="https://avatars.githubusercontent.com/u/28810331?v=4" />
	</a>
</div>

## Disclaimer
The exams available are based as closely as possible on the official exams at 42, however there may be some differences.
If you find a significant difference, don't hesitate to open an issue.

## License
```text
Examshell Copyright (C) 2022 - ...  Clément Bertrand
    
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
```
