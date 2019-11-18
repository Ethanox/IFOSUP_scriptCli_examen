import { ctrlForm, ctrlFormValidate } from './controlers/crtlForm'
import { ctrlListRemove, ctrlListInit } from './controlers/ctrlList'
import Budget from './models/Budget'
import { updateView } from './views/ViewBudget'
import { initForm } from './views/ViewForm'
import { DOMString } from './config'
import '../styles/style.css';

window.addEventListener('load', () => {
	const budgetClass = new Budget();

	initForm();
	ctrlListInit(budgetClass)
	updateView(budgetClass, 0)
	
	document.querySelector(DOMString.FORM).addEventListener('submit', (event) => {
		event.preventDefault();
		ctrlForm(budgetClass);
	})
	
	document.addEventListener("click", (event) => {
		if (event.target) {
			if (event.target.className.includes(DOMString.LIST_CLOSE_BTN_CLASS)) {
				const id = event.target.parentNode.parentNode.parentNode.parentNode.id;
				ctrlListRemove(budgetClass, id);
			}
			
			console.log(event)
			console.log(event.path)
			console.log(typeof event.path)
			console.log(event.path[4].id === "accordion_ent")
			console.log(event.path[4].id === "accordion_dep")
			if (event.path && (event.path[4].id === "accordion_ent" || event.path[4].id === "accordion_dep")) {
				updateView(budgetClass, event.target.parentNode.parentNode.getAttribute("month"))
			}
		}
	})
	
	const inputTags = document.querySelectorAll(DOMString.FORM + " input");
	for (let i = 0; i < inputTags.length; i++) {
		inputTags[i].addEventListener("keyup", (e) => {
			ctrlFormValidate(e.target);
		})
	
		inputTags[i].addEventListener("focus", (e) => {
			ctrlFormValidate(e.target);
		})
	}
})