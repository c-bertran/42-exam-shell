export default {
	hello: 'Bienvenue dans Examshell',
	difficulty: {
		question: 'Sélectionnez votre difficulté',
		list: [
			{ title: 'Normal', value: 'Normal' },
			{ title: 'Difficile', value: 'Difficile' }
		]
	},
	select: {
		question: 'Sélectionnez votre examen (vous pouvez écrire votre recherche)',
		error: 'Pour que le programme fonctionne correctement, vous devez au moins sélectionner un examen. Pour ce faire, redémarrez l\'application',
		prompt: 'L\'invité de commande n\'a pas pu être rendue dans l\'environnement actuel'
	},
	git: {
		render: 'rendu',
		subject: 'sujet'
	},
	info: {
		dir: 'Votre dossier de travail est ici :',
		git: 'N\'oubliez pas de commit vos projets via git dans le dossier de rendu. Vous n\'avez néanmoins pas besoin de push.'
	},
	options: {
		question: '(Optionnel) Sélectionnez les options que vous souhaitez activer',
		hint: 'Espace pour sélectionner, Retour pour valider',
		infinite: {
			title: 'Illimité',
			description: 'Il n\'y a plus de limite de temps'
		},
		doom: {
			title: 'Doom',
			description: 'Tout votre travail et votre git sont réinitialisés si grademe échou !'
		}
	},
	error: {
		gitInit: 'Êtes-vous sûr d\'avoir installé git et bash ?',
		exec: 'Child a échoué avec le code d\'erreur',
		command: 'Commande introuvable',
		help: 'Vouliez-vous dire :'
	},
	grademe : {
		correction: 'Votre exercice est en cours de correction',
		finish: 'L\'examen est terminé, vous pouvez maintenant fermer examshell',
		time: 'Vous pourez `grademe` votre exercise dans',
		failed: 'Échoué',
		success: 'Réussi',
		trace: 'Trace',
		error: 'Erreur'
	},
	help: {
		help: 'Imprimer l\'explication de la commande',
		finish: 'Close examshell, votre session actuelle est définitivement fermée',
		grademe: 'Valider votre projet',
		status: 'Récupérer les informations sur la session en cours'
	},
	exercise: {
		start: 'Le sujet sélectionné est',
		dir: 'Vous devez soumettre le projet dans le dossier :',
		goal: 'La validation de celui-ci vous donnera',
		level: 'Vous avez actuellement',
		points: 'points',
		retry: 'Nombre d\'essai(s)'
	},
	outOfTime: 'Le temps est terminé, il n\'est plus possible de `grademe` son projet'
};
