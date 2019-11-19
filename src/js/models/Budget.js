
export default class Budget {
	constructor() {
		this.budgets = []
		this.getStorage()
	}

	addBudget(month, type, desc, value) {
		const id = this.generateNewId()
		const budget = { id, month, type, desc, value }
		this.budgets.push(budget)
		this.localStorage()
		return budget
	}

	removeBudget(id) {
		const index = this.budgets.findIndex(el => el.id === id)
		this.budgets.splice(index, 1)
		this.localStorage()
	}

	generateNewId() {
		// TODO security: prevent same ID
		const min = Math.ceil(100000)
		const max = Math.floor(999999)
		return "ID" + (Math.floor(Math.random() * (max - min)) + min)
	}

	getTot(type, month) {
		let sum = 0
		this.budgets.forEach((budget) => {
			if ((type === "*" || budget.type === type) && month === budget.month) {
				sum += parseFloat(budget.value);
			}
		})
		return sum
	}

	localStorage() {
		localStorage.setItem('budget', JSON.stringify(this.budgets));
	}

	getStorage() {
		const storage = JSON.parse(localStorage.getItem('budget'))
		if (storage) {
			this.budgets = storage
		}
	}

	getBudget(id) {
		let returnVar = false;
		this.budgets.forEach((budget) => {
			if (id === budget.id)
				returnVar = budget
		})
		return returnVar
	}

	isEmptyMonth(type, month) {
		let returnVar = true;
		this.budgets.forEach((budget) => {
			if ((type === "*" || type === budget.type) && month === budget.month)
				returnVar = false
		})
		return returnVar
	}
}