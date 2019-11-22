import * as config from "../config";

export const clear = () => {
	document.querySelector(config.DOMString.FORM).reset()
	document.querySelector(config.DOMString.FORM_MONTH).focus()
}

export const init = () => {
	for (let [key, value] of Object.entries(config.month)) {
		const balise = "<option value='%key%'>%value%</option>"
		balise = balise.replace("%key%", key)
		balise = balise.replace("%value%", value)
		document.querySelector(config.DOMString.FORM_MONTH).insertAdjacentHTML('beforeend', balise);
	}
	document.querySelector(config.DOMString.FORM_MONTH).focus()
}

export const update = (DOMStringForm, DOMIncorrect) => {
	DOMStringForm.forEach(el => {
		document.querySelector(el).style.borderColor = DOMIncorrect.includes(el) ? config.DOMString.FORM_INPUT_ERROR_COLOR : config.DOMString.FORM_INPUT_VALID_COLOR
	});
	if(DOMIncorrect.length === 0) { // if no error then focus first form element
		document.querySelector(DOMStringForm[0]).focus()
	} else { // else focus first wrong element
		document.querySelector(DOMIncorrect[0]).focus()
	}
}