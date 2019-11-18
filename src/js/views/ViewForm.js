import { DOMString } from "../config";

export const clear = () => {
	document.querySelector(DOMString.FORM).reset()
	document.querySelector(DOMString.FORM_TYPE).focus()
}

export const initForm = () => {
	document.querySelector(DOMString.FORM_TYPE).focus()
}