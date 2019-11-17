var BudgetController = (function () {
	var Depense = function (id, description, valeur) {
		this.id = id;
		this.description = description;
		this.valeur = valeur;
		this.pourcentage = -1;
	};
	Depense.prototype.calculPourcentage = function (totalEnt) {
		if (totalEnt > 0) {
			this.pourcentage = Math.round(this.valeur / totalEnt * 100);
		} else {
			this.pourcentage = -1;
		}
	};
	Depense.prototype.getPourcentage = function () {
		return this.pourcentage;
	};
	var Entree = function (id, description, valeur) {
		this.id = id;
		this.description = description;
		this.valeur = valeur;
	};
	var calculeTotal = function (type) {
		var somme = 0;
		data.toutLesElements[type].forEach(function (element) {
			somme += element.valeur
		});
		data.totals[type] = somme;
	};
	var data = {
		toutLesElements: {
			dep: [],
			ent: []
		},
		totals: {
			dep: 0,
			ent: 0
		},
		budget: 0,
		pourcentage: -1
	};
	return {
		addItem: function (type, des, val) {
			var newItem, ID;
			if (data.toutLesElements[type].length > 0) {
				ID = data.toutLesElements[type][data.toutLesElements[type].length -1].id + 1;
			} else {
				ID = 0;
			}	
			if (type === 'dep') {
				newItem = new Depense(ID, des, val);
			} else if (type === 'ent') {
				newItem = new Entree(ID, des, val);
			}
			// ajoute dans la structure
			data.toutLesElements[type].push(newItem);
			// retourne le nouvelle élement
			return newItem;
		}, // fin addItem

		deleteItem: function (type, id) {
			var ids, index;
			// récupère tout les éléments du type
			ids = data.toutLesElements[type].map(function (actuel) {
				return actuel.id;
			});
			// recherche celui avec le même id
			index = ids.indexOf(id);
			// supprime l'élément
			if (index !== -1) {
				data.toutLesElements[type].splice(index, 1);
			}
		}, // fin deleteItem

		calculerBudget: function () {
			// 1. Calculer le total des entrées et dépenses
			calculeTotal('dep');
			calculeTotal('ent');
			// 2. Calculer le budget
			data.budget = data.totals.ent - data.totals.dep;
			// 3. Calcule du pourcentage
			if (data.totals.ent > 0) {
				data.pourcentage = Math.round((data.totals.dep / data.totals.ent) * 100);
			} else {
				data.pourcentage = -1
			}
			
		}, // fin calculerBudget
		getBudget: function () {
			return {
				budget: data.budget,
				totalEnt: data.totals.ent,
				totalDep: data.totals.dep,
				pourcentage: data.pourcentage
			}
		},
		calculerPourcent: function () {
			data.toutLesElements.dep.forEach(function (el) {
				el.calculPourcentage(data.totals.ent);
			});
		}, // fin calculerPourcent
		getPourcentages: function () {
			var toutLesPourcentages = data.toutLesElements.dep.map(function (el) {
				return el.getPourcentage();
			});
			return toutLesPourcentages;
		}, // fin getPourcentage
		testing: function () {
			console.log(data);
		} // fin testing
	}
})();

var UIController = (function () {
	var DOMStrings = {
		inputType: '.add__type',
		inputDescr: '.add__description',
		inputValeur: '.add__valeur',
		inputBtn: '.add__btn',
		containerEntree: '.entree__list',
		containerDepense: '.depense__list',
		budgetLabel: '.budget__valeur',
		entreeLabel: '.budget__entree--valeur',
		depenseLabel: '.budget__depense--valeur',
		pourcentLabel: '.budget__depense--pourcentage',
		container: '.container',
		depenseLabelPourcent: '.item__pourcentage',
		dateLabel: '.budget__titre--mois'
	};
	var formatNombre = function (nombre, type) {
		var num, numSplit, entier, decimal;
		num = Math.abs(nombre);
		num = num.toFixed(2);
		numSplit = num.split('.');
		entier = numSplit[0];
		decimal = numSplit[1];
		if (entier.length > 3) {
			entier = entier.substr(0, entier.length - 3) + ' ' + entier.substr(entier.length - 3, 3);
		}
		return (type === 'dep' ? '-' : '+') + ' ' + entier + '.' + decimal;
	}; // fin formatNombre

	var noeudListForEach = function (list, callback) {
		for (var i = 0; i < list.length; i++) {
			callback(list[i], i);
		}
	}; // fin noeudListForEach
	return {
		getInput: function () {
			return {
				type: document.querySelector(DOMStrings.inputType).value,
				description: document.querySelector(DOMStrings.inputDescr).value.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''),
				valeur: parseFloat(document.querySelector(DOMStrings.inputValeur).value)
			}
		}, // fin getInput

		addListItem: function (obj, type) {
			//1. Créer une chaine HTML avec des espaces réservés
			var html, newHtml, element;
			if (type === 'ent') {
				element = DOMStrings.containerEntree;
				html = '<div class="item clearfix" id="ent-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__valeur">%valeur%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === 'dep') {
				element = DOMStrings.containerDepense;
				html = '<div class="item clearfix" id="dep-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__valeur">%valeur%</div><div class="item__pourcentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			//2. Remplacer ces espaces par les données actuelles
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%valeur%', formatNombre(obj.valeur, type));
			//3. Insérer l'HTML dans le DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		}, // fin addListItem

		supprimeElementListe: function (IDSelectionner) {
			var asupprimer;
			asupprimer = document.getElementById(IDSelectionner);
			asupprimer.parentNode.removeChild(asupprimer);
		}, // fin supprimeElementListe

		effaceChamps: function () {
			var champs, champsTableau;
			champs = document.querySelectorAll(DOMStrings.inputDescr + ',' + DOMStrings.inputValeur);
			champsTableau = Array.prototype.slice.call(champs);
			champsTableau.forEach(function (element, index, tableau) {
				element.value = '';
			});
			champsTableau[0].focus();
		}, // fin effaceChamps

		afficheBudget: function (obj) {
			var type = obj.budget >= 0 ? 'ent' : 'dep';
			document.querySelector(DOMStrings.budgetLabel).textContent = formatNombre(obj.budget, type);
			document.querySelector(DOMStrings.entreeLabel).textContent = formatNombre(obj.totalEnt, 'ent');
			document.querySelector(DOMStrings.depenseLabel).textContent = formatNombre(obj.totalDep, 'dep');
			if (obj.pourcentage > 0) {
				document.querySelector(DOMStrings.pourcentLabel).textContent = obj.pourcentage + '%';
			} else {
				document.querySelector(DOMStrings.pourcentLabel).textContent = '---';
			}
		}, // fin afficheBudget

		affichePourcentages: function (pourcentages) {
			var champs = document.querySelectorAll(DOMStrings.depenseLabelPourcent);
			
			noeudListForEach(champs, function (actuel, index) {
				if (pourcentages[index] > 0) {
					actuel.textContent = pourcentages[index] + '%';
				} else {
					actuel.textContent = '---';
				}
			})
		}, // fin affichePourcentages

		afficheMois: function () {
			var maintenant, mois, annee, lesMois;
			lesMois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
			maintenant = new Date();
			annee = maintenant.getFullYear();
			mois = maintenant.getMonth();
			document.querySelector(DOMStrings.dateLabel).textContent = lesMois[mois] + ' ' + annee;
		}, // fin afficheMois

		changeType: function () {
			var champs = document.querySelectorAll(
				DOMStrings.inputType + ',' +
				DOMStrings.inputDescr + ',' +
				DOMStrings.inputValeur
			);
			noeudListForEach(champs, function (actuel) {
				actuel.classList.toggle('red-focus');
			});
			document.querySelector(DOMStrings.inputBtn).classList.toggle('red');

		}, // fin de changeType

		getDOMStrings: function () {
			return DOMStrings;
		} // fin DOMStrings
	};
})();

var Controller = (function (budgetCtrl, UICtrl) {

	var setupEventListener = function () {
		var DOM = UICtrl.getDOMStrings();

		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAjoutElement);

		document.addEventListener('keypress', function (event) {
			if (event.keyCode === 13 || event.which === 13) {
				ctrlAjoutElement();
			}
		}); // fin keypress

		document.querySelector(DOM.container).addEventListener('click', ctrlSupprimeElement); // fin supprimer élément

		document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType); // Fin changement type

	};    // fin setupEventListener
	
	var changeBudget = function() {
		// 1. Calculer le budget
		budgetCtrl.calculerBudget();
		// 2. Retourne le budget
		var budget = BudgetController.getBudget();
		// 3. Afficher le budget dans l'UI
		UICtrl.afficheBudget(budget);
	}; // fin changeBudget

	var ctrlAjoutElement = function() {
		var input, newItem;
		// 1. Récupérer le contenu des champs
		input = UICtrl.getInput();
		// Test si les champs sont remplis
		if (input.description !== '' && !isNaN(input.valeur) && input.valeur > 0) {
			// 2. Ajouter l'élément dans le BudgetCtrl
			newItem = budgetCtrl.addItem(input.type, input.description, input.valeur);
			// 3. Ajouter l'élement dans l'UI
			UICtrl.addListItem(newItem, input.type);
			UICtrl.effaceChamps();
			// 4. Calculer le Budget
			changeBudget();
			// 5. calculer et changer les pourcentage
			changePourcent();

		}	
	}; // fin CtrlAjouteElement

	var ctrlSupprimeElement = function (event) {
		var itemID, splitID, type, ID;

		// 1. Récupérer l'ID de l'élément a supprimer
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
		if (itemID) {
			splitID = itemID.split('-');
			type = splitID[0];
			ID = parseInt(splitID[1]);
		}
		// 2. Supprimer l'élément de structure de données
		budgetCtrl.deleteItem(type, ID);
		// 3. Supprimer l'élement de l'UI
		UICtrl.supprimeElementListe(itemID);
		// 4. Mise a jour des totaux
		changeBudget();
		// 5. calculer et changer les pourcentages
		changePourcent();
	};
	var changePourcent = function () {
		// 1. calculer le pourcentage
		budgetCtrl.calculerPourcent();
		// 2. lire le pourcentage du BudgetController
		var pourcentages = budgetCtrl.getPourcentages();
		// 3. Mise à jour l'UI
		UICtrl.affichePourcentages(pourcentages);
	}
	return {
		init: function() {
			console.log('Application a démarrer');
			UICtrl.afficheBudget({
				budget: 0,
				totalEnt: 0,
				totalDep: 0,
				pourcentage: -1
			});
			UIController.afficheMois();
			setupEventListener();
		}
	}
	
})(BudgetController, UIController);

Controller.init();