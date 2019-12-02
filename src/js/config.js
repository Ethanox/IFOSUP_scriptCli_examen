export const DOMString = {
	FORM: "#form_budget",
	FORM_MONTH: "#form_budget > select.add__month",
	FORM_TYPE: "#form_budget > select.add__type",
	FORM_DESC: "#form_budget > input.add__description",
	FORM_VALUE: "#form_budget > input.add__valeur",
	FORM_INPUT_ERROR_COLOR: "red",
	FORM_INPUT_VALID_COLOR: "#e7e7e7",

	BUDGET_ENTREE: ".budget__entree--valeur",
	BUDGET_EXPENSE: ".budget__depense--valeur",
	BUDGET_EXPENSE_POURC: ".budget__depense--pourcentage",
	BUDGET_GLOBAL: ".budget__valeur",
	BUDGET_TITLE_MONTH: ".budget__titre--mois",

	LIST_CLOSE_BTN_CLASS: "ion-ios-close-outline",
	LIST_ENTREE: ".entree__list",
	LIST_DEPENSE: ".depense__list"
}

export const DEFAULT_MONTH_ID = 0;
export const month = [
	"Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"
]

export const DOMTags = {
	NEW_ACCORDION: `
		<div class="card">
			<div class="card-header" id="accordion_header_%BUDGET_TYPE%_%BUDGET_MONTH_ID%" month="%BUDGET_MONTH_ID%">
				<a data-toggle="collapse" href="#" role="button" aria-expanded="false" data-target=".accordion_body_%BUDGET_MONTH_ID%" aria-controls="accordion_body_ent_%BUDGET_MONTH_ID% accordion_body_dep_%BUDGET_MONTH_ID%">
					%BUDGET_MONTH_NAME%
				</a>
			</div>

			<div id="accordion_body_%BUDGET_TYPE%_%BUDGET_MONTH_ID%" class="collapse accordion_body_%BUDGET_MONTH_ID%" aria-labelledby="accordion_header_%BUDGET_TYPE%_%BUDGET_MONTH_ID%">
				<div class="card-body"></div>
			</div>
		</div>`,
	NEW_BUDGET_ENT: `
		<div class="item clearfix" id="%BUDGET_ID%">
			<div class="item__description">%BUDGET_DESC%</div>
				<div class="right clearfix">
					<div class="item__valeur">+ %BUDGET_VALUE%€</div>
						<div class="item__delete">
							<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
	NEW_BUDGET_DEP: `
	<div class="item clearfix" id="%BUDGET_ID%">
		<div class="item__description">%BUDGET_DESC%</div>
		<div class="right clearfix">
			<div class="item__valeur">- %BUDGET_VALUE%€</div>
			<div class="item__pourcentage">%BUDGET_POURC%%</div>
			<div class="item__delete">
				<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
			</div>
		</div>
	</div>
	`,
}

String.prototype.replaceAll = function (search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};

