import * as viewForm from '../views/viewForm';
import * as viewList from '../views/viewList';
import * as viewBudget from '../views/viewBudget';
import * as config from '../config';
import Budget from '../models/Budget';
import * as ctrlMonth from './ctrlMonth';

export const send = (chartClass) => {
	const DOMIncorrect = validate()
	const DOMStringForm = [config.DOMString.FORM_MONTH, config.DOMString.FORM_TYPE, config.DOMString.FORM_DESC, config.DOMString.FORM_VALUE]
	if(DOMIncorrect.length === 0) {
		let temp = document.querySelector(config.DOMString.FORM_MONTH);
		const month = parseFloat(temp[temp.selectedIndex].value);
		temp = document.querySelector(config.DOMString.FORM_TYPE);
		const type = temp[temp.selectedIndex].value;
		const desc = document.querySelector(config.DOMString.FORM_DESC).value;
		const value = document.querySelector(config.DOMString.FORM_VALUE).value;
		const newBudget = new Budget(month, type, desc, value);
		ctrlMonth.update(month)
		viewForm.clear();
		viewList.addBudget(newBudget, Budget.getTot("ent", month));
		viewList.updatePourc(month)
		viewBudget.update(month)
		chartClass.updateData()
		viewForm.update(DOMStringForm, []);
		viewList.openCollapse()
	} else {
		viewForm.update(DOMStringForm, DOMIncorrect);
	}
}

const validate = () => {
	let DOMInvalid = [];
	const array = [config.DOMString.FORM_MONTH, config.DOMString.FORM_TYPE, config.DOMString.FORM_DESC, config.DOMString.FORM_VALUE]
	array.forEach(el => {
		let target = document.querySelector(el)
		if (!target.value || target.value === "" || target.value === "---") {
			DOMInvalid.push(el)
		}
	})
	return DOMInvalid
}