import * as config from './config'

import * as ctrlList from './controlers/ctrlList'
import * as crtlForm from './controlers/crtlForm'
import * as ctrlCustomChart from './controlers/ctrlCustomChart'

import * as viewBudget from './views/viewBudget'
import * as viewForm from './views/viewForm'
import * as viewList from './views/viewList'

import Budget from './models/Budget'
import CustomChart from './models/CustomChart'

import './views/viewCharts'
import '../styles/style.css'

window.addEventListener('load', () => {
	Budget.restore();

	const chart = ctrlCustomChart.createChart()
	const chartClass = new CustomChart(chart)
	
	viewForm.init();
	ctrlList.init()
	viewBudget.update(0)
	viewList.updateCollapse(0)
	
	document.querySelector(config.DOMString.FORM).addEventListener('submit', (event) => {
		event.preventDefault(); // prevent page to reload
		crtlForm.send(chartClass);
	})
	
	document.addEventListener("click", (event) => {
		if (event.target) {
			if (event.target.className.includes(config.DOMString.LIST_CLOSE_BTN_CLASS)) {
				const id = event.target.parentNode.parentNode.parentNode.parentNode.id;
				ctrlList.remove(id);
				ctrlCustomChart.createChart()
			}
			if (event.target.parentNode.id && event.target.parentNode.id.includes("accordion_header")) {
				viewBudget.update(event.target.parentNode.getAttribute("month"))
				viewList.updateCollapse(event.target.parentNode.getAttribute("month"))
				chartClass.updateData()
			}
		}
	})
})