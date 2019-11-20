import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { MONTH } from "../config";
import CustomChart from "../models/CustomChart";
import { viewSetTitleCChart } from "../views/ViewCharts";

export const createChart = (budgetClass) => {
	am4core.useTheme(am4themes_animated);

	// Create chart instance
	let chart = am4core.create("chartdiv", am4charts.XYChart);

	// Title
	chart = viewSetTitleCChart(chart);

	// Create axes
	let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "category";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.inversed = true;
	categoryAxis.renderer.minGridDistance = 20;
	categoryAxis.renderer.axisFills.template.disabled = false;
	categoryAxis.renderer.axisFills.template.fillOpacity = 0.05;


	let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
	valueAxis.min = -100;
	valueAxis.max = 100;
	valueAxis.renderer.minGridDistance = 50;
	valueAxis.renderer.ticks.template.length = 5;
	valueAxis.renderer.ticks.template.disabled = false;
	valueAxis.renderer.ticks.template.strokeOpacity = 0.4;

	// Legend
	chart.legend = new am4charts.Legend();
	chart.legend.position = "right";
	chart.legend.width = 100;

	// Use only absolute numbers
	chart.numberFormatter.numberFormat = "#.#s";

	// Create series
	function createSeries(field, name, color) {
		let series = chart.series.push(new am4charts.ColumnSeries());
		series.dataFields.valueX = field;
		series.dataFields.categoryY = "category";
		series.stacked = true;
		series.name = name;
		series.stroke = color;
		series.fill = color;

		let label = series.bullets.push(new am4charts.LabelBullet);
		label.label.text = "{valueX}%";
		label.label.fill = am4core.color("#fff");
		label.label.strokeWidth = 0;
		label.label.truncate = false;
		label.label.hideOversized = true;
		label.locationX = 0.5;
		return series;
	}

	let interfaceColors = new am4core.InterfaceColorSet();
	let positiveColor = interfaceColors.getFor("positive");
	let negativeColor = interfaceColors.getFor("negative");

	createSeries("negative", "Dépense", negativeColor);
	createSeries("positive", "Entrée", positiveColor);
	return chart
}