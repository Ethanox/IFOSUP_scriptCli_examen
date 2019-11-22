import * as config from "../config"

export const update = (budgetClass, month) => {
	const entree = budgetClass.getTot("ent", month)
	const expense = budgetClass.getTot("dep", month)
	document.querySelector(config.DOMString.BUDGET_ENTREE).textContent = formatNombre(entree, "ent")
	document.querySelector(config.DOMString.BUDGET_EXPENSE).textContent = formatNombre(expense, "dep")
	document.querySelector(config.DOMString.BUDGET_GLOBAL).textContent = formatNombre((entree - expense), entree >= expense ? "ent" : "dep")
	document.querySelector(config.DOMString.BUDGET_EXPENSE_POURC).textContent = (entree === 0 ? "---" : Math.round((expense / entree) * 100)) + "%"
	document.querySelector(config.DOMString.BUDGET_TITLE_MONTH).textContent = config.month[month]
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