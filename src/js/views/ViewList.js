import { MONTH, DOMString, DOMTags } from "../config";
import { isRegExp } from "util";

export const addBudgetList = (budget, sumBudgetEnt) => {
	let balise;

	if (!document.querySelector("#accordion_header_" + budget.type + "_" + budget.month)) {
		balise = DOMTags.NEW_ACCORDION
		balise = balise.replaceAll("%BUDGET_TYPE%", budget.type)
		balise = balise.replaceAll("%BUDGET_MONTH_ID%", budget.month)
		balise = balise.replaceAll("%BUDGET_MONTH_NAME%", MONTH[budget.month])
		document.querySelector(budget.type === "ent" ? DOMString.LIST_ENTREE : DOMString.LIST_DEPENSE).insertAdjacentHTML('afterbegin', balise);
	}
	if (budget.type === "ent") {
		balise = DOMTags.NEW_BUDGET_ENT
	} else {
		balise = DOMTags.NEW_BUDGET_DEP
	}
	balise = balise.replaceAll("%BUDGET_ID%", budget.id)
	balise = balise.replaceAll("%BUDGET_DESC%", budget.desc)
	balise = balise.replaceAll("%BUDGET_VALUE%", budget.value)
	balise = balise.replaceAll("%BUDGET_POURC%", sumBudgetEnt === 0 ? "---" : Math.round((budget.value / sumBudgetEnt) * 100))
	document.querySelector("#accordion_body_" + budget.type + "_" + budget.month + " > .card-body").insertAdjacentHTML('afterbegin', balise)
}

export const removeBudgetList = (budget, isLastInMonth) => {
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
	console.log(month);
	
	// close all collapse
	$('#entree .collapse').collapse('hide')
	$('#depense .collapse').collapse('hide')
	// open 'entree' collapse
	$("#accordion_body_ent_" + month).collapse('show')
	// open 'expense' collapse
	$("#accordion_body_dep_" + month).collapse('show')
}