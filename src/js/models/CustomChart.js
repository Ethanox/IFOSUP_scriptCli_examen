import * as config from "../config";

export default class CustomChart {
	constructor(budgetClass, chart) {
		this.chart = chart
		this.updateData(budgetClass)
	}

	updateData(budgetClass) {
		const newData = []
		for (let [key, value] of Object.entries(config.month)) {
			const depTot = budgetClass.getTot("dep", key)
			const entTot = budgetClass.getTot("ent", key)
			newData.push({
				"category": value,
				"negative": 0 - Math.round((depTot / (entTot + depTot)) * 100),
				"positive": Math.round((entTot / (entTot + depTot)) * 100),
			})
		}
		this.chart.data = newData
	}
}