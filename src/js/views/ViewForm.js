import { DOMString, MONTH } from "../config";

export const clear = () => {
	document.querySelector(DOMString.FORM).reset()
	document.querySelector(DOMString.FORM_TYPE).focus()
}

export const initForm = () => {
	document.querySelector(DOMString.FORM).insertAdjacentHTML('afterbegin', '<select class="add__month"></select>')
	for (let [key, value] of Object.entries(MONTH)) {
		const balise = "<option value='%key%'>%value%</option>"
		balise = balise.replace("%key%", key)
		balise = balise.replace("%value%", value)
		document.querySelector(DOMString.FORM_MONTH).insertAdjacentHTML('beforeend', balise);
	}
	document.querySelector(DOMString.FORM_MONTH).focus()
}