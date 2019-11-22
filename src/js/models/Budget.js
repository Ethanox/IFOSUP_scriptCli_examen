
export default class Budget {
	static list = []
	constructor(month, type, desc, value) {
		this.id = Budget.generateNewId();
		this.month = month;
		this.type = type;
		this.desc = desc;
		this.value = value;
		Budget.list = []
		Budget.list.push(this)
		if (Budget.isLocalStorageAvailable())
			Budget.save()
	}


	static removeBudget(id) {
		const index = Budget.list.findIndex(el => el.id === id)
		Budget.list.splice(index, 1)
		if (Budget.isLocalStorageAvailable())
			Budget.save()
	}

	static generateNewId = () => {
		// TODO security: prevent same ID
		const min = Math.ceil(100000)
		const max = Math.floor(999999)
		return "ID" + (Math.floor(Math.random() * (max - min)) + min)
	}

	static getTot(type, month) {
		let sum = 0
		Budget.list.forEach((budget) => {
			if ((type === "*" || budget.type === type) && month == budget.month) {
				sum += parseFloat(budget.value);
			}
		})
		return sum
	}

	static save() {
		if (this.isLocalStorageAvailable()) {
			localStorage.setItem('budget', JSON.stringify(Budget.list));
		}
	}

	static restore() {
		if (Budget.isLocalStorageAvailable()) {
			const storage = JSON.parse(localStorage.getItem('budget'))
			if (storage) {
				Budget.list = storage
			}
		} else {
			Budget.list = []
		}
	}

	static getBudget(id) {
		let returnVar = false;
		Budget.list.forEach((budget) => {
			if (id === budget.id)
				returnVar = budget
		})
		return returnVar
	}

	static isEmptyMonth(type, month) {
		let returnVar = true;
		Budget.list.forEach((budget) => {
			if ((type === "*" || type === budget.type) && (month === "*" || month === budget.month))
				returnVar = false
		})
		return returnVar
	}

	static isLocalStorageAvailable() {
		try {
			localStorage.setItem("test", "test")
			localStorage.removeItem('test')
			return true
		} catch (e) {
			return false
		}
	}

	static getMaxValue(type, month) {
		let maxValue = 0;
		Budget.list.forEach((budget) => {
			if ((type === "*" || type === budget.type) && (month === "*" || month === budget.month) && maxValue < budget.value)
				maxValue = budget.value
		})
		return maxValue
	}
}