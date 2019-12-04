import * as ViewForm from '../views/viewForm';
import * as ViewList from '../views/viewList';
import * as ViewBudget from '../views/viewBudget';
import * as Config from '../config';
import Budget from '../models/Budget';
import * as CtrlMonth from './ctrlMonth';

export const send = (chartClass) => {
	const DOMStringForm = [Config.DOMString.FORM_MONTH, Config.DOMString.FORM_TYPE, Config.DOMString.FORM_DESC, Config.DOMString.FORM_VALUE] // list of each form data
	const DOMIncorrect = validate()
	if(DOMIncorrect.length === 0) { // if no error
		let temp = document.querySelector(Config.DOMString.FORM_MONTH);
		const month = parseFloat(temp[temp.selectedIndex].value);
		temp = document.querySelector(Config.DOMString.FORM_TYPE);
		const type = temp[temp.selectedIndex].value;
		const desc = document.querySelector(Config.DOMString.FORM_DESC).value;
		const value = document.querySelector(Config.DOMString.FORM_VALUE).value;
		const newBudget = new Budget(month, type, desc, value);
		CtrlMonth.update(month)
		ViewForm.clear();
		ViewList.addBudget(newBudget, Budget.getTot("ent", month));
		ViewList.updatePourc(month)
		ViewBudget.update(month)
		chartClass.updateData()
		ViewForm.update(DOMStringForm, []);
		ViewList.openCollapse()
	} else {
		ViewForm.update(DOMStringForm, DOMIncorrect); // update DOM error elements with red border
	}
}

const validate = () => {
	let DOMInvalid = [];
	const array = [Config.DOMString.FORM_MONTH, Config.DOMString.FORM_TYPE, Config.DOMString.FORM_DESC, Config.DOMString.FORM_VALUE]
	array.forEach(el => {
		let target = document.querySelector(el)
		if (!target.value || target.value === "" || target.value === "---") {
			DOMInvalid.push(el)
		}
	})
	return DOMInvalid
}