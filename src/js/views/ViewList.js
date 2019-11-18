
export const addBudgetList = budget => {
	let tag, balise;
	
	if (document.getElementById("accordion_" + budget.type + "_" + budget.month) == null) {
		console.log("debug1")
		balise = `
		<div class="accordion" id="accordion_${budget.type}_${budget.month}">
			<div class="card">
			</div>
		</div>`
		document.querySelector("#entree > .entree__list").insertAdjacentHTML('afterbegin', balise);
	}
	
	if (!document.getElementById("accordion_header_" + budget.type + "_" + budget.month)) {
		console.log("debug2")
		balise = `
		<div class="card-header" id="accordion_header_${budget.type + "_" + budget.month}">
			<h2 class="mb-0">
				<button class="btn btn-link" type="button" data-toggle="collapse"
					data-target="#accordion_body_${budget.type + "_" + budget.month}" aria-expanded="true" aria-controls="accordion_body_${budget.type + "_" + budget.month}">
					${budget.month}
				</button>
			</h2>
		</div>

		<div id="accordion_body_${budget.type}_${budget.month}" class="collapse show" aria-labelledby="accordion_header_${budget.type}_${budget.month}"
			data-parent="#accordion_${budget.type}_${budget.month}">
			<div class="card-body">

			</div>
		</div>`
		console.log(document.querySelector("#accordion_" + budget.type + "_" + budget.month + " > .card"))
		document.querySelector("#accordion_" + budget.type + "_" + budget.month + " > .card").insertAdjacentHTML('afterbegin', balise);
	}
	if (budget.type === "ent") {
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
	document.querySelector("#accordion_body_"+ budget.type + "_" + budget.month + " > .card-body").insertAdjacentHTML('afterbegin', balise);
}

export const removeBudgetList = budgetId => {
	const asupprimer = document.getElementById(budgetId);
	console.log(asupprimer)
	console.log(asupprimer.parentNode)
	asupprimer.parentNode.removeChild(asupprimer);
}