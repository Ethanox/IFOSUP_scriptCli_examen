import {removeBudgetList, addBudgetList, updatePourc} from '../views/ViewList';
import { updateView } from '../views/ViewBudget';

export const ctrlListRemove = (budgetClass, budgetId) => {
	const budget = budgetClass.getBudget(budgetId);
	budgetClass.removeBudget(budgetId);
	removeBudgetList(budget, budgetClass.isEmptyMonth("ent", budget.month));
	updatePourc(budgetClass, budget.month);
	updateView(budgetClass, new Date().getMonth());
};

export const ctrlListInit = (budgetClass) => {
	budgetClass.budgets.forEach(budget => {
		addBudgetList(budget, budgetClass.getTot("ent", budget.month))
	})
}