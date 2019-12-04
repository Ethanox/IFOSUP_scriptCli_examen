import Budget from "../models/Budget"
import * as Config from "../config";

let lastFocusedMonth;
let currentFocusedMonth;

export const init = () => {
	if(Budget.isLocalStorageAvailable() && localStorage.getItem("currentMonth") !== null) {
		currentFocusedMonth = parseInt(localStorage.getItem("currentMonth"));
	} else {
		currentFocusedMonth = Config.DEFAULT_MONTH_ID;
	}
	currentFocusedMonth = currentFocusedMonth;
}


export const getCurrentFocusedMonth = () => {
	return currentFocusedMonth;
}

export const setLastFocusedMonth = (lastMonth) => {
	lastFocusedMonth = parseInt(lastMonth)
}

export const getLastFocusedMonth = () => {
	return lastFocusedMonth;
}

export const update = (newFocusedMonth) => {
	lastFocusedMonth = currentFocusedMonth
	currentFocusedMonth = parseInt(newFocusedMonth)
	if(Budget.isLocalStorageAvailable()) {
		localStorage.setItem("currentMonth", currentFocusedMonth)
	}
}