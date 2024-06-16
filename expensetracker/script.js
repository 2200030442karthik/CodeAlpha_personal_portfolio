document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');
    const expensesList = document.getElementById('expenses');
    const totalAmount = document.getElementById('total-amount');
    const messageDiv = document.getElementById('message');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function renderExpenses() {
        expensesList.innerHTML = '';
        let total = 0;
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.description} (${expense.category}): $${expense.amount.toFixed(2)}
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            `;
            expensesList.appendChild(li);
            total += expense.amount;
        });
        totalAmount.textContent = total.toFixed(2);
    }

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = type;
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = '';
        }, 3000);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const category = categoryInput.value;
        if (description === '' || isNaN(amount) || amount <= 0) {
            showMessage('Invalid input. Please enter valid data.', 'error');
            return;
        }
        expenses.push({ description, amount, category });
        saveExpenses();
        renderExpenses();
        form.reset();
        showMessage('Expense added successfully!', 'success');
    });

    window.editExpense = (index) => {
        const expense = expenses[index];
        descriptionInput.value = expense.description;
        amountInput.value = expense.amount;
        categoryInput.value = expense.category;
        expenses.splice(index, 1);
        saveExpenses();
        renderExpenses();
    };

    window.deleteExpense = (index) => {
        expenses.splice(index, 1);
        saveExpenses();
        renderExpenses();
        showMessage('Expense deleted successfully!', 'success');
    };

    renderExpenses();
});
