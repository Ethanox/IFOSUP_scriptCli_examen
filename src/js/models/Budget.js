
export default class Budget {
	constructor() {
		this.budgets = []
	}

	addBudget(type, desc, value) {
		const id = this.generateNewId()
		const budget = { id, type, desc, value }
		this.budgets.push(budget)
		return budget
	}

	removeBudget(id) {
		const index = this.budgets.findIndex(el => el.id === id)
		this.budgets.splice(index, 1)
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
}