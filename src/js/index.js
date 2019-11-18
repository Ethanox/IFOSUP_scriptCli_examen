import {ctrlForm, ctrlFormValidate} from './controlers/crtlForm'
import {ctrlListRemove, ctrlListInit} from './controlers/ctrlList'
import Budget from './models/Budget'
import {updateView} from './views/ViewBudget'
import {initForm} from './views/ViewForm'
import { DOMString } from './config'



const budgetClass = new Budget();

initForm();
updateView(budgetClass);
ctrlListInit(budgetClass)

document.querySelector(DOMString.FORM).addEventListener('submit', (event) => {
	event.preventDefault();
	ctrlForm(budgetClass);
})

document.addEventListener("click", (event) => {
	if(event.target && event.target.className.includes(DOMString.LIST_CLOSE_BTN_CLASS)) {
		const id = event.target.parentNode.parentNode.parentNode.parentNode.id;
		console.log(id)
		ctrlListRemove(budgetClass, id);
	}
})

const inputTags = document.querySelectorAll(DOMString.FORM +" input");
for(let i = 0; i < inputTags.length;i++) {
	inputTags[i].addEventListener("keyup", (e) => {
		ctrlFormValidate(e.target);
	})
	
	inputTags[i].addEventListener("focus", (e) => {
		ctrlFormValidate(e.target);
	})
}