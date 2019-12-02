import * as viewList from '../views/viewList';
import * as viewBudget from '../views/viewBudget';
import * as ctrlMonth from "../controlers/ctrlMonth"
import Budget from '../models/Budget';
import CustomChart from '../models/CustomChart';

export const remove = (budgetId, chartClass) => {
	const budget = Budget.getBudget(budgetId)
	Budget.removeBudget(budgetId)
	viewList.removeBudget(budget, Budget.isEmptyMonth(budget.type, budget.month))
	viewList.updatePourc(budget.month)
	if(Budget.getTot("*", budget.month) === 0) { // if no budget left for this month, focus next month
		ctrlMonth.update(budget.month + 1)
	}
	viewBudget.update()
	viewList.openCollapse() // show list for the next month
	chartClass.updateData()
};

export const init = () => {
	Budget.list.forEach(budget => {
		viewList.addBudget(budget, Budget.getTot("ent", budget.month))
	})
}