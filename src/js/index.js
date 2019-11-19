import { ctrlForm } from './controlers/crtlForm'
import { ctrlListRemove, ctrlListInit } from './controlers/ctrlList'
import Budget from './models/Budget'
import { updateView } from './views/ViewBudget'
import { initForm, ctrlFormValidate } from './views/ViewForm'
import { DOMString } from './config'
import '../styles/style.css';

window.addEventListener('load', () => {
	const budgetClass = new Budget();

	initForm();
	ctrlListInit(budgetClass)
	updateView(budgetClass, 0)
	
	document.querySelector(DOMString.FORM).addEventListener('submit', (event) => {
		event.preventDefault(); // prevent page to reload
		ctrlForm(budgetClass);
	})
	
	document.addEventListener("click", (event) => {
		if (event.target) {
			if (event.target.className.includes(DOMString.LIST_CLOSE_BTN_CLASS)) {
				const id = event.target.parentNode.parentNode.parentNode.parentNode.id;
				ctrlListRemove(budgetClass, id);
			}
			if (event.target.parentNode.id && event.target.parentNode.id.includes("accordion_header")) {
				updateView(budgetClass, event.target.parentNode.getAttribute("month"))
			}
		}
	})
})