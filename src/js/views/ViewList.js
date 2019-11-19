import { MONTH, DOMString } from "../config";
import { isRegExp } from "util";

export const addBudgetList = (budget, sumBudgetEnt) => {
	let balise;

	if (!document.querySelector("#accordion_header_" + budget.type + "_" + budget.month)) {
		balise = `
		<div class="card">
			<div class="card-header" id="accordion_header_${budget.type + "_" + budget.month}" month="${budget.month}">
				<a data-toggle="collapse" href="#accordion_body_${budget.type + "_" + budget.month}" role="button" aria-expanded="false" aria-controls="accordion_body_${budget.type}_${budget.month}">
					${MONTH[budget.month]}
				</a>
			</div>

			<div id="accordion_body_${budget.type}_${budget.month}" class="collapse" aria-labelledby="accordion_header_${budget.type}_${budget.month}">
				<div class="card-body">
				</div>
			</div>
		</div>`
		document.querySelector(budget.type === "ent" ? DOMString.LIST_ENTREE : DOMString.LIST_DEPENSE).insertAdjacentHTML('afterbegin', balise);
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
		balise = `
		<div class="item clearfix" id="${budget.id}">
			<div class="item__description">${budget.desc}</div>
            <div class="right clearfix">
                <div class="item__valeur">- ${budget.value}€</div>
                <div class="item__pourcentage">${sumBudgetEnt === 0 ? "---" : Math.round((budget.value / sumBudgetEnt) * 100)}%</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>`
	}
	document.querySelector("#accordion_body_" + budget.type + "_" + budget.month + " > .card-body").insertAdjacentHTML('afterbegin', balise)
	
	// close all collapse
	$('.collapse').collapse('hide')

	sleep(500).then(() => { // fix a bug where collapse('hide') make time (due to animations) so if we don't wait, element is closing when i said to reopen it (not sure about this bug)
		// open 'entree' collapse
		$("#accordion_body_ent_" + budget.month).collapse('show')
		// open 'expense' collapse
		$("#accordion_body_dep_" + budget.month).collapse('show')
	});
}

export const removeBudgetList = (budget, isLastInMonth) => {
	let toDelete = document.getElementById(budget.id);
	toDelete.parentNode.removeChild(toDelete);
	if (isLastInMonth) {
		toDelete = document.getElementById("accordion_header_" + budget.type + "_" + budget.month).parentNode;
		toDelete.parentNode.removeChild(toDelete);
	}
}

export const updatePourc = (budgetClass, month) => {
	const total = budgetClass.getTot("ent", month)
	document.querySelectorAll("#accordion_body_dep_" + month +" .item__pourcentage").forEach(el => {
		const budgetId = el.parentNode.parentNode.id;
		const budget = budgetClass.getBudget(budgetId)
		el.innerHTML = (total === 0 ? "---" : Math.round((budget.value / total) * 100)) +"%"
	})
}


function sleep (time) {
	return new Promise((resolve) => setTimeout(resolve, time));
  }