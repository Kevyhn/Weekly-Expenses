let credit;
do {
	credit = parseInt(prompt('Weekly Expenses: $'));
} while(isNaN(credit) || credit <= 0);
let creditRest = credit;
let budgetTotal = document.querySelector('.budget-total');
budgetTotal.textContent = `Budget: $${credit}`;
let remainingBudget = document.querySelector('.remaining-budget');
remainingBudget.textContent = `Remaining: $${creditRest}`;
document.getElementById('submit-btn').addEventListener('click', () => {
	let spentValue = document.getElementById('spent-inp').value;
	let amountValue = parseInt(document.getElementById('amount-inp').value);
	if ((typeof spentValue == 'number') || !isNaN(parseInt(spentValue)) || spentValue == '' || isNaN(amountValue)) {
		alert('Invalid values');
	} else {
		creditRest -= amountValue;
		function updateBackground() {
			creditRest < credit * 75 / 100 ? remainingBudget.style.background = "rgb(0,155,0)" : remainingBudget.style.background = "rgba(0, 255, 0, 0.8)";
			creditRest < credit * 50 / 100 ? remainingBudget.style.background = "rgb(0,200,0)" : null;
			creditRest < credit * 25 / 100 ? remainingBudget.style.background = "rgb(255,0,0,0.5)" : null;
		}
		updateBackground();
		remainingBudget.textContent = `Remaining: $${creditRest}`;
		document.querySelector('.empy') ? document.querySelector('.empy').remove() : null;
		let expenses = document.getElementById('expenses');
		expenses.innerHTML += `
			<div class="expense">
					<input class="details-content" disabled value="${spentValue}"/>
					<div class="amount">$${amountValue}</div>
					<button class="close-btn">X</button>
			</div>
		`;
		document.getElementById('spent-inp').value = '';
		document.getElementById('amount-inp').value = '';
		let closeBtn = document.querySelectorAll('.close-btn');
		closeBtn.forEach((element) => {
			element.addEventListener('click', (e) => {
				e.target.setAttribute('disabled', 'true');
				remainingBudget.textContent = `Remaining: 
				$${creditRest += parseInt(e.target.previousSibling.previousSibling
				.textContent.split('$').join(''))}`;
				updateBackground();
				let parentElement = e.target.parentElement;
				parentElement.style.opacity = "0";
				setTimeout(() => {
					parentElement.remove();
					!expenses.textContent.includes('$')
					? expenses.innerHTML = `<p class="empy">Your Expenses</p>` : null;
				}, 400)
			});
		});
	};
});
