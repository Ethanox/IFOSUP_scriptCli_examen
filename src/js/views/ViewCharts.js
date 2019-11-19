import * as am4core from "@amcharts/amcharts4/core";

export const viewSetTitleCChart = (chart) => {
	let title = chart.titles.push(new am4core.Label());
	title.text = "Récapitulatif par mois";
	title.fontSize = 25;
	title.marginBottom = 15;
	return chart
}