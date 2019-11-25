import Budget from "../models/Budget"
import * as config from "../config";

export const setCurrentMonth = (currentMonth) => {
	if(Budget.isLocalStorageAvailable()) {
		console.log("test");
		
		localStorage.setItem("currentMonth", currentMonth)
	}
}

export const getCurrentMonth = () => {
	if(Budget.isLocalStorageAvailable()) {
		console.log(localStorage.getItem("currentMonth"));
		return localStorage.getItem("currentMonth");
	} else {
		return config.DEFAULT_MONTH_ID;
	}
}