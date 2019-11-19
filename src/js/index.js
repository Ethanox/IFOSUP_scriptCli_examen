import { ctrlForm } from './controlers/crtlForm'
import { ctrlListRemove, ctrlListInit } from './controlers/ctrlList'
import { updateView } from './views/ViewBudget'
import { initForm, ctrlFormValidate } from './views/ViewForm'
import { DOMString } from './config'
import { createChart } from './controlers/ctrlCustomChart'
import { updateCollapse } from './views/ViewList'

import Budget from './models/Budget'
import CustomChart from './models/CustomChart'

import './views/ViewCharts'

import '../styles/style.css'

window.addEventListener('load', () => {
	const budgetClass = new Budget();

	const chart = createChart(budgetClass)
	console.log(chart);
	
	const chartClass = new CustomChart(budgetClass, chart)
	
	initForm();
	ctrlListInit(budgetClass)
	updateView(budgetClass, 0)
	updateCollapse(0)
	
	document.querySelector(DOMString.FORM).addEventListener('submit', (event) => {
		event.preventDefault(); // prevent page to reload
		ctrlForm(budgetClass, chartClass);
	})
	
	document.addEventListener("click", (event) => {
		if (event.target) {
			if (event.target.className.includes(DOMString.LIST_CLOSE_BTN_CLASS)) {
				const id = event.target.parentNode.parentNode.parentNode.parentNode.id;
				ctrlListRemove(budgetClass, id);
				createChart(budgetClass)
			}
			if (event.target.parentNode.id && event.target.parentNode.id.includes("accordion_header")) {
				updateView(budgetClass, event.target.parentNode.getAttribute("month"))
				updateCollapse(event.target.parentNode.getAttribute("month"))
				chartClass.updateData(budgetClass)
			}
		}
	})
})