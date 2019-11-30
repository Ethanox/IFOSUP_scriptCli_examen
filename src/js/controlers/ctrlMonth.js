import Budget from "../models/Budget"
import * as config from "../config";

let lastFocusedMonth;
let currentFocusedMonth;

export const init = () => {
	if(Budget.isLocalStorageAvailable()) {
		currentFocusedMonth = localStorage.getItem("currentMonth") === null ? config.DEFAULT_MONTH_ID : localStorage.getItem("currentMonth");
	} else {
		currentFocusedMonth = config.DEFAULT_MONTH_ID;
	}
}

export const getCurrentFocusedMonth = () => {
	return currentFocusedMonth;
}

export const setLastFocusedMonth = (lastMonth) => {
	lastFocusedMonth = lastMonth
}

export const getLastFocusedMonth = () => {
	return lastFocusedMonth;
}

export const update = (newFocusedMonth) => {
	lastFocusedMonth = currentFocusedMonth
	currentFocusedMonth = newFocusedMonth
	if(Budget.isLocalStorageAvailable()) {
		localStorage.setItem("currentMonth", currentFocusedMonth)
	}
}