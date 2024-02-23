
window.onload = function () {
    displayExpenses();
};

function addExpense() {
    var amount = document.getElementById('amount').value;
    var description = document.getElementById('description').value;
    var category = document.getElementById('category').value;

    if (amount && description && category) {
        var expense = {
            amount: amount,
            description: description,
            category: category,
        };

        var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));

        displayExpenses();

        document.getElementById('amount').value = '';
        document.getElementById('description').value = '';
        document.getElementById('category').value = '';
    } else {
        alert('Please fill in all fields');
    }
}

function displayExpenses() {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    var expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenses.forEach(function (expense, index) {
        var listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <strong>${expense.amount}</strong> - ${expense.description} - ${expense.category}
            <button onclick="editExpense(${index})" class="btn btn-primary ml-2">Edit</button>
            <button onclick="deleteExpense(${index})" class="btn btn-danger ml-2">Delete</button>
        `;
        expenseList.appendChild(listItem);
    });
}

function deleteExpense(index) {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

function editExpense(index) {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    var editedExpense = expenses[index];

    var newAmount = prompt("Enter new amount:", editedExpense.amount);
    var newDescription = prompt("Enter new description:", editedExpense.description);
    var newCategory = prompt("Enter new category:", editedExpense.category);

    if (newAmount !== null && newDescription !== null && newCategory !== null) {
        expenses[index] = {
            amount: newAmount,
            description: newDescription,
            category: newCategory,
        };
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses();
    }
}
