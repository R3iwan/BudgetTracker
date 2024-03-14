let budget = 0;
let expenses = [];
let revenues = [];

window.onload = function() {
    if(localStorage.getItem('expenses')) {
        expenses = JSON.parse(localStorage.getItem('expenses'));
        updateExpensesList();
        updateTotalBudget();
    }
    if(localStorage.getItem('revenues')) {
        revenues = JSON.parse(localStorage.getItem('revenues'));
        updateRevenuesList();
        updateTotalBudget();
    }
}

function addExpense() {
    const expenseName = document.getElementById("expenseInput").value.trim();
    const expenseAmount = parseFloat(document.getElementById("amountInput").value);

    if (expenseName === "" || isNaN(expenseAmount) || expenseAmount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    const expense = {
        name: expenseName,
        amount: expenseAmount
    };

    expenses.push(expense);
    updateExpensesList();
    updateTotalBudget();

    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function addRevenue() {
    const revenueName = document.getElementById("revenueInput").value.trim();
    const revenueAmount = parseFloat(document.getElementById("revenueAmountInput").value);

    if (revenueName === "" || isNaN(revenueAmount) || revenueAmount <= 0) {
        alert("Please enter a valid revenue name and amount.");
        return;
    }

    const revenue = {
        name: revenueName,
        amount: revenueAmount
    };

    revenues.push(revenue);
    updateRevenuesList();
    updateTotalBudget();

    localStorage.setItem('revenues', JSON.stringify(revenues));
}

function updateExpensesList() {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";
    expenses.forEach(expense => {
        const li = document.createElement("li");
        li.textContent = `${expense.name}: ${expense.amount}`;
        expenseList.appendChild(li);
    });
}

function updateRevenuesList() {
    const revenueList = document.getElementById("revenueList");
    revenueList.innerHTML = "";
    revenues.forEach(revenue => {
        const li = document.createElement("li");
        li.textContent = `${revenue.name}: ${revenue.amount} KZT`;
        revenueList.appendChild(li);
    });
}

function updateTotalBudget() {
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const totalRevenues = revenues.reduce((total, revenue) => total + revenue.amount, 0);
    budget = totalRevenues - totalExpenses;
    document.getElementById("totalBudget").textContent = `${budget.toFixed(2)} KZT`;
}

function refreshPage() {
    localStorage.removeItem('expenses');
    localStorage.removeItem('revenues');
    location.reload();
}
