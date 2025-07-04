# budget_buddies.py

def display_store(items):
    """Displays the available items in the store."""
    print("\n--- Available Items ---")
    for i, (item, price) in enumerate(items.items()):
        print(f"{i + 1}. {item}: £{price:.2f}")
    print("-----------------------")

def get_player_choice(max_choice):
    """Gets a valid item choice from the player."""
    while True:
        try:
            choice = int(input(f"Enter the number of the item you want to buy (1-{max_choice}), or 0 to finish shopping: "))
            if 0 <= choice <= max_choice:
                return choice
            else:
                print("Invalid choice. Please enter a number within the range.")
        except ValueError:
            print("Invalid input. Please enter a number.")

def main():
    """Main function to run the Budget Buddies game."""
    initial_budget = 50.00
    print(f"Welcome to Budget Buddies! You have £{initial_budget:.2f} to spend.")

    store_items = {
        "Apple": 0.75,
        "Banana": 0.50,
        "Bread": 2.20,
        "Milk": 1.50,
        "Eggs (dozen)": 3.00,
        "Cheese": 4.50,
        "Cereal": 3.75,
        "Chicken Breast": 6.00,
        "Pasta": 1.20,
        "Tomato Sauce": 1.80
    }

    shopping_cart = {}
    current_spent = 0.00

    item_keys = list(store_items.keys()) # Get a list of item names for easy indexing

    while True:
        display_store(store_items)
        print(f"\nYour current budget: £{initial_budget - current_spent:.2f}")
        print(f"Items in your cart: {', '.join([f'{item} x{qty}' for item, qty in shopping_cart.items()]) if shopping_cart else 'None'}")
        print(f"Current total spent: £{current_spent:.2f}")

        choice = get_player_choice(len(store_items))

        if choice == 0:
            print("\n--- Shopping Finished ---")
            break

        selected_item_name = item_keys[choice - 1]
        selected_item_price = store_items[selected_item_name]

        # Basic quantity selection (can be expanded later)
        quantity = 1
        print(f"You selected: {selected_item_name} (£{selected_item_price:.2f})")
        # For now, we'll just add one. Later, we can ask for quantity.

        if current_spent + (selected_item_price * quantity) <= initial_budget:
            current_spent += (selected_item_price * quantity)
            shopping_cart[selected_item_name] = shopping_cart.get(selected_item_name, 0) + quantity
            print(f"Added {quantity} x {selected_item_name} to your cart.")
        else:
            print("Oops! Adding that would put you over budget. Choose something else or finish shopping.")

    print(f"\nFinal budget remaining: £{initial_budget - current_spent:.2f}")
    print("Thank you for playing Budget Buddies!")
    print("Your final shopping list:")
    for item, qty in shopping_cart.items():
        print(f"- {item} x{qty}")

if __name__ == "__main__":
    main()
