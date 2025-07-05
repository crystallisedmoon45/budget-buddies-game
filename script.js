// Data for store items
const storeItems = {
    "Apple": 0.75,
    "Banana": 0.50,
    "Bread": 2.20,
    "Milk": 1.50,
    "Eggs (dozen)": 3.00,
    "Cheese": 4.50,
    "Cereal": 3.75,
    "Chicken Breast": 6.00,
    "Pasta": 1.20,
    "Tomato Sauce": 1.80,
    "Hubba Bubba": 0.50
    
};

let initialBudget = 50.00;
let currentSpent = 0.00;
let shoppingCart = {}; // Object to store cart items and their quantities

// Get references to HTML elements
const budgetDisplay = document.getElementById('budget-display');
const spentDisplay = document.getElementById('spent-display');
const storeItemsContainer = document.getElementById('store-items');
const cartList = document.getElementById('cart-list');
const finishBtn = document.getElementById('finish-shopping-btn');

/**
 * Updates the displayed budget, current spent, and shopping cart.
 */
function updateDisplay() {
    budgetDisplay.textContent = `£${(initialBudget - currentSpent).toFixed(2)}`;
    spentDisplay.textContent = `£${currentSpent.toFixed(2)}`;

    // Clear existing cart items
    cartList.innerHTML = '';
    for (const item in shoppingCart) {
        if (shoppingCart[item] > 0) { // Only display items with quantity > 0
            const li = document.createElement('li');
            li.textContent = `${item} x${shoppingCart[item]} (£${(storeItems[item] * shoppingCart[item]).toFixed(2)})`;
            cartList.appendChild(li);
        }
    }
    if (Object.keys(shoppingCart).length === 0 || Object.values(shoppingCart).every(qty => qty === 0)) {
        const li = document.createElement('li');
        li.textContent = 'None';
        cartList.appendChild(li);
    }
}

/**
 * Renders the available store items in the 'store-items' container.
 * Creates a div and a button for each item.
 */
function renderStoreItems() {
    storeItemsContainer.innerHTML = ''; // Clear existing items before rendering

    for (const item in storeItems) {
        const price = storeItems[item];

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('store-item'); // Add a class for styling (optional but good practice)

        const itemNameSpan = document.createElement('span');
        itemNameSpan.textContent = `${item}: £${price.toFixed(2)}`;

        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Cart';
        addButton.classList.add('add-to-cart-btn'); // Add a class for styling/selection

        // Attach event listener to the button
        addButton.addEventListener('click', () => {
            addItemToCart(item, price);
        });

        itemDiv.appendChild(itemNameSpan);
        itemDiv.appendChild(addButton);
        storeItemsContainer.appendChild(itemDiv);
    }
}

/**
 * Adds an item to the shopping cart, if budget allows.
 * @param {string} itemName - The name of the item to add.
 * @param {number} price - The price of the item.
 */
function addItemToCart(itemName, price) {
    if (currentSpent + price <= initialBudget) {
        currentSpent += price;
        shoppingCart[itemName] = (shoppingCart[itemName] || 0) + 1; // Increment quantity
        updateDisplay(); // Update the UI
        console.log(`Added 1 x ${itemName}. Current spent: £${currentSpent.toFixed(2)}`);
    } else {
        alert("Oops! Adding that would put you over budget. Choose something else or finish shopping.");
    }
}

// Event listener for finish button
finishBtn.addEventListener('click', () => {
    let finalSummary = `\n--- Shopping Finished ---\n`;
    finalSummary += `Final budget remaining: £${(initialBudget - currentSpent).toFixed(2)}\n`;
    finalSummary += `Thank you for playing Budget Buddies!\n`;
    finalSummary += `Your final shopping list:\n`;
    for (const item in shoppingCart) {
        if (shoppingCart[item] > 0) {
            finalSummary += `- ${item} x${shoppingCart[item]} (£${(storeItems[item] * shoppingCart[item]).toFixed(2)})\n`;
        }
    }
    if (Object.keys(shoppingCart).length === 0 || Object.values(shoppingCart).every(qty => qty === 0)) {
        finalSummary += "- No items purchased.\n";
    }

    alert(finalSummary); // Use alert for now, can be a modal later
});

// --- Initial Setup ---
// Call renderStoreItems to display the items when the page loads
renderStoreItems();
// Call updateDisplay to show initial budget and empty cart
updateDisplay();
