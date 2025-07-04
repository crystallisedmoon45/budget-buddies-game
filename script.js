// Data for store items (similar to Python dictionary)
const storeItems = {
    "Apple": 0.75,
    "Banana": 0.50,
    // ... more items
};

let initialBudget = 50.00;
let currentSpent = 0.00;
let shoppingCart = {}; // Object to store cart items

const budgetDisplay = document.getElementById('budget-display');
const spentDisplay = document.getElementById('spent-display');
const storeItemsContainer = document.getElementById('store-items');
const cartList = document.getElementById('cart-list');
const finishBtn = document.getElementById('finish-shopping-btn');

function updateDisplay() {
    budgetDisplay.textContent = `£${(initialBudget - currentSpent).toFixed(2)}`;
    spentDisplay.textContent = `£${currentSpent.toFixed(2)}`;
    // Logic to update cartList based on shoppingCart
}

function renderStoreItems() {
    // Loop through storeItems and create HTML elements (buttons/divs) for each
    // Attach event listeners to "Add" buttons
}

function addItemToCart(itemName, price) {
    if (currentSpent + price <= initialBudget) {
        currentSpent += price;
        shoppingCart[itemName] = (shoppingCart[itemName] || 0) + 1;
        updateDisplay(); // Update the UI
        console.log(`Added ${itemName}.`);
    } else {
        alert("Cannot add, over budget!");
    }
}

// Event listener for finish button
finishBtn.addEventListener('click', () => {
    alert(`Finished shopping! Remaining: £${(initialBudget - currentSpent).toFixed(2)}`);
    // Display final cart summary
});

// Initial setup
renderStoreItems();
updateDisplay();
