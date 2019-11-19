import { DOMString, MONTH } from "../config";

export const clear = () => {
	document.querySelector(DOMString.FORM).reset()
	document.querySelector(DOMString.FORM_MONTH).focus()
}

export const initForm = () => {
	for (let [key, value] of Object.entries(MONTH)) {
		const balise = "<option value='%key%'>%value%</option>"
		balise = balise.replace("%key%", key)
		balise = balise.replace("%value%", value)
		document.querySelector(DOMString.FORM_MONTH).insertAdjacentHTML('beforeend', balise);
	}
	document.querySelector(DOMString.FORM_MONTH).focus()
}

export const ctrlFormValidate = () => {
	let DOMInvalid = "";
	const array = [DOMString.FORM_MONTH, DOMString.FORM_TYPE, DOMString.FORM_DESC, DOMString.FORM_VALUE]
	array.forEach(el => {
		let target = document.querySelector(el)
		if (!target.value || target.value === "" || target.value === "---") {
			target.style.borderColor = DOMString.FORM_INPUT_ERROR_COLOR
			DOMInvalid = el
		} else {
			target.style.borderColor = DOMString.FORM_INPUT_VALID_COLOR
		}
	})
	if(DOMInvalid !== "") {
		document.querySelector(DOMInvalid).focus()
	}
	return DOMInvalid === ""
}