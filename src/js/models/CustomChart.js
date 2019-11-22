import * as config from "../config";
import Budget from "./Budget";

export default class CustomChart {
	constructor(chart) {
		this.chart = chart
		this.updateData()
	}

	updateData() {
		const newData = []
		for (let [key, value] of Object.entries(config.month)) {
			const depTot = Budget.getTot("dep", key)
			const entTot = Budget.getTot("ent", key)
			newData.push({
				"category": value,
				"negative": 0 - Math.round((depTot / (entTot + depTot)) * 100),
				"positive": Math.round((entTot / (entTot + depTot)) * 100),
			})
		}
		this.chart.data = newData
	}
}