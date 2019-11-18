
export default class Budget {
	constructor() {
		this.budgets = []
		this.getStorage()
	}

	addBudget(type, desc, value) {
		const id = this.generateNewId()
		const budget = { id, type, desc, value }
		this.budgets.push(budget)
		this.localStorage()
		return budget
	}

	removeBudget(id) {
		console.log(id)
		console.log(this.budgets)
		const index = this.budgets.findIndex(el => el.id === id)
		console.log(index)
		this.budgets.splice(index, 1)
		this.localStorage()
	}

	generateNewId() {
		// TODO security: prevent same ID
		const min = Math.ceil(100000)
		const max = Math.floor(999999)
		return "ID" + (Math.floor(Math.random() * (max - min)) + min)
	}

	getTot(type) {
		let sum = 0
		this.budgets.forEach((budget) => {
			if (type === "*" || budget.type === type)
				sum += parseFloat(budget.value);
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

	clearLocalStorage() {
		localStorage.setItem('budget', JSON.stringify([]))
	}
}