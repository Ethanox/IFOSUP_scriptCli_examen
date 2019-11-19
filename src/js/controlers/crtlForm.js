import { clear, ctrlFormValidate } from '../views/ViewForm';
import { addBudgetList, updatePourc } from '../views/ViewList';
import { updateView } from '../views/ViewBudget';
import { DOMString } from '../config';

export const ctrlForm = (budgetClass) => {
	if(ctrlFormValidate()) {
		let temp = document.querySelector(DOMString.FORM_MONTH);
		const month = parseFloat(temp[temp.selectedIndex].value);
		temp = document.querySelector(DOMString.FORM_TYPE);
		const type = temp[temp.selectedIndex].value;
		const desc = document.querySelector(DOMString.FORM_DESC).value;
		const value = document.querySelector(DOMString.FORM_VALUE).value;
		const newBudget = budgetClass.addBudget(month, type, desc, value);
		clear();
		addBudgetList(newBudget, budgetClass.getTot("ent", month));
		updatePourc(budgetClass, month)
		updateView(budgetClass, month);
	}
}