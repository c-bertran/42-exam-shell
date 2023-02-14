export default {
	hello: 'Welcome to examshell',
	difficulty: {
		question: 'Select your difficulty',
		list: [
			{ title: 'Normal', value: 'Normal' },
			{ title: 'Hard', value: 'Hard' }
		]
	},
	select: {
		question: 'Select your exam (you can write your search)',
		error: 'For the program to work properly, you must at least select an exam. To do this, restart the application',
		prompt: 'Prompt couldn\'t be rendered in the current environment'
	},
	git: {
		render: 'render',
		subject: 'subject'
	},
	info: {
		dir: 'Your working directory is here :',
		git: 'Don\'t forget to commit your projects via git in the render folder. You don\'t need to push them at all'
	},
	options: {
		question: '(Optional) Select the options you wish to activate',
		hint: 'Space to select, Return to submit',
		infinite: {
			title: 'Infinite',
			description: 'There is no time limit anymore'
		},
		doom: {
			title: 'Doom',
			description: 'All your work and your git is reset if grademe failed !'
		}
	},
	error: {
		gitInit: 'Are you sure you have git and bash installed ?',
		exec: 'Child failed with error code',
		command: 'Command not found',
		help: 'Did you mean :'
	},
	grademe : {
		correction: 'Your exercise is being corrected',
		finish: 'Exam is finished, you can now close examshell',
		time: 'You can `grademe` your exercise in',
		failed: 'Failed',
		success: 'Success',
		trace: 'Trace',
		error: 'Error'
	},
	help: {
		help: 'Print explanation about command',
		finish : 'Close examshell, your current session is definitely closed',
		grademe: 'Validate your projet',
		status : 'Recover informations about the current session'
	},
	exercise: {
		start: 'The selected subject is',
		dir: 'You must submit the project in the folder :',
		goal: 'The validation of this one will give you',
		level: 'You currently have',
		points: 'points',
		retry: 'Number of trial(s)'
	},
	outOfTime: 'The time is over, it is no longer possible to `grademe` your project'
};
