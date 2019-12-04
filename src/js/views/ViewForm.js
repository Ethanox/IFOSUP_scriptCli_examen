import * as Config from "../config";

export const clear = () => {
	document.querySelector(Config.DOMString.FORM).reset()
	document.querySelector(Config.DOMString.FORM_MONTH).focus()
}

export const init = () => {
	// insert each month in select form
	for (let [key, value] of Object.entries(Config.month)) {
		const balise = "<option value='%key%'>%value%</option>"
		balise = balise.replace("%key%", key)
		balise = balise.replace("%value%", value)
		document.querySelector(Config.DOMString.FORM_MONTH).insertAdjacentHTML('beforeend', balise);
	}
	// focus first element of form
	document.querySelector(Config.DOMString.FORM_MONTH).focus()
}

export const update = (DOMStringForm, DOMIncorrect = []) => {
	DOMStringForm.forEach(el => {
		document.querySelector(el).style.borderColor = DOMIncorrect.includes(el) ? Config.DOMString.FORM_INPUT_ERROR_COLOR : Config.DOMString.FORM_INPUT_VALID_COLOR
	});
	if(DOMIncorrect.length === 0) { // if no error then focus first form element
		document.querySelector(DOMStringForm[0]).focus()
	} else { // else focus first wrong element
		document.querySelector(DOMIncorrect[0]).focus()
	}
}