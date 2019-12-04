import * as Config from "../config"
import * as CtrlMonth from "../controlers/ctrlMonth"
import * as CtrlBudget from "../controlers/ctrlBudget"
import Budget from "../models/Budget"

export const update = (month = CtrlMonth.getCurrentFocusedMonth()) => {
	const entree = Budget.getTot("ent", month)
	const expense = Budget.getTot("dep", month)
	document.querySelector(Config.DOMString.BUDGET_ENTREE).textContent = CtrlBudget.formatNombre(entree, "ent")
	document.querySelector(Config.DOMString.BUDGET_EXPENSE).textContent = CtrlBudget.formatNombre(expense, "dep")
	document.querySelector(Config.DOMString.BUDGET_GLOBAL).textContent = CtrlBudget.formatNombre((entree - expense), entree >= expense ? "ent" : "dep")
	document.querySelector(Config.DOMString.BUDGET_EXPENSE_POURC).textContent = (entree === 0 ? "---" : Math.round((expense / entree) * 100)) + "%"
	document.querySelector(Config.DOMString.BUDGET_TITLE_MONTH).textContent = Config.month[month]
}