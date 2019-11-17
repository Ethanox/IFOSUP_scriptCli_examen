import { clear } from '../views/ViewForm';
import { addBudgetList } from '../views/ViewList';
import { updateView } from '../views/ViewBudget';

export const ctrlForm = (budget) => {
	if (document.querySelector("#form_budget > .add__description").value === "") {
		console.log(document.querySelector("#form_budget > .add__description").validationMessage);
		document.querySelector("#form_budget > .add__description").setCustomValidity("Can't be empty");
		console.log(document.querySelector("#form_budget > .add__description").validationMessage);
	}

	if(typeof document.querySelector("#form_budget > .add__valeur").value == "number" ||
		document.querySelector("#form_budget > .add__valeur").value === "") {
		console.log("error")
		// TODO SHOW ERROR
	} else {
		const temp = document.querySelector("#form_budget > select.add__type");
		const type = temp[temp.selectedIndex].value;
		const desc = document.querySelector("#form_budget > .add__description").value;
		const value = document.querySelector("#form_budget > .add__valeur").value;
		const newBudget = budget.addBudget(type, desc, value);
		clear();
		addBudgetList(newBudget);
		updateView(budget);
	}
}

export const ctrlFormValidate = (target) => {
	console.log(target.className)
	if(target.className.includes("add__description")) { // SI champ description
		if(target.value === "") {
			target.style.borderColor = "red";
		} else {
			target.style.borderColor = "#e7e7e7";
		}
	} else if(target.className.includes("add__valeur")) { // SI champ valeur
		console.log(target.value)
		if(target.value === "" ||target.value === 0 || typeof target.value == "number" ) {
			target.style.borderColor = "red";
		} else {
			target.style.borderColor = "#e7e7e7";
		}
	}
}