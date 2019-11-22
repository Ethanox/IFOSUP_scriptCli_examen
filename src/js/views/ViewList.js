import * as config from "../config";

export const addBudget = (budget, sumBudgetEnt) => {
	let balise;

	if (!document.querySelector("#accordion_header_" + budget.type + "_" + budget.month)) {
		balise = config.DOMTags.NEW_ACCORDION
		balise = balise.replaceAll("%BUDGET_TYPE%", budget.type)
		balise = balise.replaceAll("%BUDGET_MONTH_ID%", budget.month)
		balise = balise.replaceAll("%BUDGET_MONTH_NAME%", config.month[budget.month])
		document.querySelector(budget.type === "ent" ? config.DOMString.LIST_ENTREE : config.DOMString.LIST_DEPENSE).insertAdjacentHTML('afterbegin', balise);
	}
	if (budget.type === "ent") {
		balise = config.DOMTags.NEW_BUDGET_ENT
	} else {
		balise = config.DOMTags.NEW_BUDGET_DEP
	}
	balise = balise.replaceAll("%BUDGET_ID%", budget.id)
	balise = balise.replaceAll("%BUDGET_DESC%", budget.desc)
	balise = balise.replaceAll("%BUDGET_VALUE%", budget.value)
	balise = balise.replaceAll("%BUDGET_POURC%", sumBudgetEnt === 0 ? "---" : Math.round((budget.value / sumBudgetEnt) * 100))
	document.querySelector("#accordion_body_" + budget.type + "_" + budget.month + " > .card-body").insertAdjacentHTML('afterbegin', balise)
}

export const removeBudget = (budget, isLastInMonth) => {
	let toDelete = document.getElementById(budget.id);
	toDelete.parentNode.removeChild(toDelete);
	if (isLastInMonth) {
		toDelete = document.getElementById("accordion_header_" + budget.type + "_" + budget.month).parentNode;
		toDelete.parentNode.removeChild(toDelete);
	}
}

export const updatePourc = (budgetClass, month) => {
	const total = budgetClass.getTot("ent", month)
	document.querySelectorAll("#accordion_body_dep_" + month + " .item__pourcentage").forEach(el => {
		const budgetId = el.parentNode.parentNode.id;
		const budget = budgetClass.getBudget(budgetId)
		el.innerHTML = (total === 0 ? "---" : Math.round((budget.value / total) * 100)) + "%"
	})
}

export const updateCollapse = (month) => {
	// close all collapse
	$('#entree .collapse').collapse('hide')
	$('#depense .collapse').collapse('hide')
	// open 'entree' collapse
	$("#accordion_body_ent_" + month).collapse('show')
	// open 'expense' collapse
	$("#accordion_body_dep_" + month).collapse('show')
}