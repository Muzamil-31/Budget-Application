
const transactionForm = document.getElementById("transactionForm");

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");

const transactionList = document.getElementById("transactionList");

// Store transactions
let transactions = [];


transactionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;
    const category = categoryInput.value;

    if (!description || amount <= 0 || !type || !category) {
        alert("Please enter valid transaction details");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type,
        category: category
    };

    transactions.push(transaction);

    updateDashboard();

    transactionForm.reset();
});


function updateDashboard() {

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(function (transaction) {

        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }

    });

    const balance = totalIncome - totalExpense;

    incomeElement.textContent = `₹${totalIncome.toFixed(2)}`;
    expenseElement.textContent = `₹${totalExpense.toFixed(2)}`;
    balanceElement.textContent = `₹${balance.toFixed(2)}`;

    displayTransactions();
}


function displayTransactions() {

    transactionList.innerHTML = "";

    transactions.forEach(function (transaction) {

        const li = document.createElement("li");

        const color = transaction.type === "income"
            ? "green"
            : "red";

        const sign = transaction.type === "income"
            ? "+"
            : "-";

        li.innerHTML = `
            <div>
                <strong>${transaction.description}</strong>
                <p>${transaction.category}</p>
            </div>

            <span style="color: ${color}">
                ${sign}₹${transaction.amount.toFixed(2)}
            </span>
        `;

        transactionList.appendChild(li);

    });
}
