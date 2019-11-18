import { clear } from '../views/ViewForm';
import { addBudgetList } from '../views/ViewList';
import { updateView } from '../views/ViewBudget';
import { DOMString } from '../config';

export const ctrlForm = (budget) => {
	// TODO check data
	const temp = document.querySelector(DOMString.FORM_TYPE);
	const type = temp[temp.selectedIndex].value;
	const desc = document.querySelector(DOMString.FORM_DESC).value;
	const value = document.querySelector(DOMString.FORM_VALUE).value;
	const newBudget = budget.addBudget(type, desc, value);
	clear();
	addBudgetList(newBudget);
	updateView(budget);
}

export const ctrlFormValidate = (target) => {
	if (target.className.includes("add__description")) { // SI champ description
		if (target.value === "") {
			target.style.borderColor = DOMString.FORM_INPUT_ERROR_COLOR;
		} else {
			target.style.borderColor = DOMString.FORM_INPUT_VALID_COLOR;
		}
	} else if (target.className.includes("add__valeur")) { // SI champ valeur
		if (target.value === "" || target.value === 0 || typeof target.value == "number") {
			target.style.borderColor = DOMString.FORM_INPUT_ERROR_COLOR;
		} else {
			target.style.borderColor = DOMString.FORM_INPUT_VALID_COLOR;
		}
	}
}