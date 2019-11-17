import {ctrlForm, ctrlFormValidate} from './controlers/crtlForm'
import {ctrlListRemove} from './controlers/ctrlList'
import Budget from './models/Budget'
import {updateView} from './views/ViewBudget'
import {initForm} from './views/ViewForm'



const budget = new Budget();
initForm();
updateView(budget);

document.getElementById("form_budget").addEventListener('submit', (event) => {
	event.preventDefault();
	ctrlForm(budget);
})

document.addEventListener("click", (event) => {
	if(event.target && event.target.className === "ion-ios-close-outline") {
		const id = event.target.parentNode.parentNode.parentNode.parentNode.id;
		ctrlListRemove(budget, id);
	}
})

const inputTags = document.querySelectorAll("#form_budget input");
for(let i = 0; i < inputTags.length;i++) {
	inputTags[i].addEventListener("keyup", (e) => {
		ctrlFormValidate(e.target);
	})
	
	inputTags[i].addEventListener("focus", (e) => {
		ctrlFormValidate(e.target);
	})
}