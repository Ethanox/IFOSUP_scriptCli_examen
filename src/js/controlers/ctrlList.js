import * as viewList from '../views/viewList';
import * as viewBudget from '../views/viewBudget';

export const remove = (budgetClass, budgetId) => {
	const budget = budgetClass.getBudget(budgetId);
	budgetClass.remove(budgetId);
	viewList.removeBudget(budget, budgetClass.isEmptyMonth("ent", budget.month));
	viewList.updatePourc(budgetClass, budget.month);
	viewBudget.update(budgetClass, new Date().getMonth());
	viewList.updateCollapse(new Date().getMonth())
};

export const init = (budgetClass) => {
	budgetClass.budgets.forEach(budget => {
		viewList.addBudget(budget, budgetClass.getTot("ent", budget.month))
	})
}