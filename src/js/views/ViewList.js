
export const addBudgetList = budget => {
	let tag, balise;
	if (budget.type === "ent") {
		tag = ".entree__list";
		balise = `
		<div class="item clearfix" id="${budget.id}">
			<div class="item__description">${budget.desc}</div>
				<div class="right clearfix">
					<div class="item__valeur">+ ${budget.value}€</div>
						<div class="item__delete">
							<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
						</div>
					</div>
				</div>
			</div>
		</div>`
	} else {
		tag = ".depense__list";
		balise = `
		<div class="item clearfix" id="${budget.id}">
			<div class="item__description">${budget.desc}</div>
            <div class="right clearfix">
                <div class="item__valeur">- ${budget.value}€</div>
                <div class="item__pourcentage">21%</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>`
	}
	document.querySelector(tag).insertAdjacentHTML('beforeend', balise);
}

export const removeBudgetList = budgetId => {
	const asupprimer = document.getElementById(budgetId);
	console.log(asupprimer)
	console.log(asupprimer.parentNode)
	asupprimer.parentNode.removeChild(asupprimer);
}