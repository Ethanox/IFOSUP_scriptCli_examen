import * as ViewList from '../views/viewList';
import * as ViewBudget from '../views/viewBudget';
import * as CtrlMonth from "../controlers/ctrlMonth"
import Budget from '../models/Budget';

export const remove = (budgetId, chartClass) => {
	const budget = Budget.getBudget(budgetId)
	Budget.removeBudget(budgetId)
	ViewList.removeBudget(budget, Budget.isEmptyMonth(budget.type, budget.month))
	ViewList.updatePourc(budget.month)
	if(Budget.getTot("*", budget.month) === 0) { // if no budget left for this month, focus next month
		CtrlMonth.update(budget.month + 1)
	}
	ViewBudget.update()
	ViewList.openCollapse() // show list for the next month
	chartClass.updateData()
};

export const init = () => {
	Budget.list.forEach(budget => {
		ViewList.addBudget(budget, Budget.getTot("ent", budget.month))
	})
}

export const calcPourcentage = (month, value) => {
	const total = Budget.getTot("ent", month)
	return (total === 0 ? "---" : Math.round((value / total) * 100)) + "%"
}