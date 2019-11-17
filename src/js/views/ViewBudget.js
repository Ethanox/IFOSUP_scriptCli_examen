export const updateView = (budgetClass) => {
	const entree = budgetClass.getTot("ent")
	const expense = budgetClass.getTot("dep")
	document.getElementsByClassName("budget__entree--valeur")[0].textContent = formatNombre(entree, "ent")
	document.getElementsByClassName("budget__depense--valeur")[0].textContent = formatNombre(expense, "dep")
	document.getElementsByClassName("budget__valeur")[0].textContent = formatNombre((entree - expense), entree >= expense ? "ent" : "dep")
	document.getElementsByClassName("budget__depense--pourcentage")[0].textContent = (entree === 0 ? "---" : Math.round((expense / entree) * 100)) + "%"
}

const formatNombre = function (nombre, type) {
	let num, numSplit, entier, decimal
	num = Math.abs(nombre)
	num = num.toFixed(2)
	numSplit = num.split('.')
	entier = numSplit[0]
	decimal = numSplit[1]
	if (entier.length > 3) {
		entier = entier.substr(0, entier.length - 3) + ' ' + entier.substr(entier.length - 3, 3)
	}
	return (type === 'dep' ? '-' : '+') + ' ' + entier + '.' + decimal
}