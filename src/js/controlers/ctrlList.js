import {removeBudgetList, addBudgetList} from '../views/ViewList';
import { updateView } from '../views/ViewBudget';

export const ctrlListRemove = (budgetClass, budgetId) => {
	budgetClass.removeBudget(budgetId);
	removeBudgetList(budgetId);
	updateView(budgetClass);
};

export const ctrlListInit = (budgetClass) => {
	budgetClass.budgets.forEach(budget => {
		addBudgetList(budget)
	})
}

