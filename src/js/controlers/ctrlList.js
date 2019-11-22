import * as viewList from '../views/viewList';
import * as viewBudget from '../views/viewBudget';
import Budget from '../models/Budget';

export const remove = (budgetId) => {
	const budget = Budget.getBudget(budgetId);
	Budget.removeBudget(budgetId);
	viewList.removeBudget(budget, Budget.isEmptyMonth("ent", budget.month));
	viewList.updatePourc(budget.month);
	viewBudget.update(new Date().getMonth());
	viewList.updateCollapse(new Date().getMonth())
};

export const init = () => {
	Budget.list.forEach(budget => {
		viewList.addBudget(budget, Budget.getTot("ent", budget.month))
	})
}