export const clear = () => {
	document.getElementById('form_budget').reset();
	document.querySelector("#form_budget > select.add__type").focus();
}

export const initForm = () => {
	document.querySelector("#form_budget > select.add__type").focus();
}