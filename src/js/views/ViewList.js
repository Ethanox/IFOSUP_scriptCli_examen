import * as Config from "../config";
import * as CtrlList from "../controlers/ctrlList";
import * as CtrlMonth from "../controlers/ctrlMonth";
import Budget from "../models/Budget";

export const addBudget = (budget, sumBudgetEnt) => {
	let balise;

	if (!document.querySelector("#accordion_header_" + budget.type + "_" + budget.month)) { // if accordion doesn't exist for this month
		balise = Config.DOMTags.NEW_ACCORDION
		balise = balise.replaceAll("%BUDGET_TYPE%", budget.type)
		balise = balise.replaceAll("%BUDGET_MONTH_ID%", budget.month)
		balise = balise.replaceAll("%BUDGET_MONTH_NAME%", Config.month[budget.month])

		let maxMonthId = -1;

		// look for the nearest actual month => if month of new budget is 23 then look for 2 or 1 or 0 month HTMLElement
		document.querySelectorAll("div[id^=accordion_header_" + budget.type).forEach(el => {
			const monthId = parseInt(el.getAttribute("month"));
			if (monthId < budget.month && monthId > maxMonthId)
				maxMonthId = monthId
		})
		if(maxMonthId > -1) {
			document.querySelector("div[id^=accordion_header_" + budget.type + "_"+ maxMonthId).parentNode.insertAdjacentHTML('afterend', balise);
		} else {
			document.querySelector(budget.type === "ent" ? Config.DOMString.LIST_ENTREE : Config.DOMString.LIST_DEPENSE).insertAdjacentHTML('afterbegin', balise);
		}
	}
	if (budget.type === "ent") {
		balise = Config.DOMTags.NEW_BUDGET_ENT
	} else {
		balise = Config.DOMTags.NEW_BUDGET_DEP
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

export const updatePourc = (month) => {
	document.querySelectorAll("#accordion_body_dep_" + month + " .item__pourcentage").forEach(el => {
		const budgetId = el.parentNode.parentNode.id
		const budget = Budget.getBudget(budgetId)
		el.innerHTML = CtrlList.calcPourcentage(month, budget.value)
	})
}

export const closeCollapse = (monthId = CtrlMonth.getLastFocusedMonth()) => {
	if (monthId !== undefined)
		$('.accordion_body_' + monthId +':not(#accordion_body_ent_'+ CtrlMonth.getCurrentFocusedMonth() +'):not(#accordion_body_dep_'+ CtrlMonth.getCurrentFocusedMonth() +')').collapse('hide')
}

export const openCollapse = (monthId = CtrlMonth.getCurrentFocusedMonth()) => {
	closeCollapse()
	if (monthId !== undefined)
		$('.accordion_body_' + monthId).collapse('show')
}