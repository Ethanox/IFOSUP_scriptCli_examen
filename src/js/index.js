import * as Config from './config'

import * as CtrlList from './controlers/ctrlList'
import * as CrtlForm from './controlers/crtlForm'
import * as CtrlCustomChart from './controlers/ctrlCustomChart'

import * as ViewBudget from './views/viewBudget'
import * as ViewForm from './views/viewForm'
import * as ViewList from './views/viewList'

import Budget from './models/Budget'
import CustomChart from './models/CustomChart'

import './views/viewCharts'
import '../styles/style.css'
import * as CtrlMonth from './controlers/ctrlMonth'

window.addEventListener('load', () => {
	Budget.restore()

	const chart = CtrlCustomChart.createChart()
	const chartClass = new CustomChart(chart)

	ViewForm.init()
	CtrlList.init()
	CtrlMonth.init()
	ViewBudget.update()
	ViewList.openCollapse()

	document.querySelector(Config.DOMString.FORM).addEventListener('submit', (event) => {
		event.preventDefault(); // prevent page to reload by submitting form
		CrtlForm.send(chartClass);
	})

	document.addEventListener("click", (event) => {
		if (event.target) {
			if (typeof event.target.className === "string" && event.target.className.includes(Config.DOMString.LIST_CLOSE_BTN_CLASS)) { // if click on delete button
				const id = event.target.parentNode.parentNode.parentNode.parentNode.id;
				CtrlList.remove(id, chartClass)
				chartClass.updateData()
			}
			
			if (event.target.parentNode.id && event.target.parentNode.id.includes("accordion_header")) { // if click 
				CtrlMonth.update(event.target.parentNode.getAttribute("month"))
				ViewBudget.update(event.target.parentNode.getAttribute("month"))
				ViewList.closeCollapse()
			}
		}
	})
})