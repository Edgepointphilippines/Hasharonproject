let cart = []; // Your cart array

// Function to display cart items
function displayCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; // Clear previous items

  if (cart.length === 0) {
    const emptyCartMessage = document.createElement("div");
    emptyCartMessage.classList.add("empty-cart");
    emptyCartMessage.textContent = "Your cart is empty.";
    cartItemsContainer.appendChild(emptyCartMessage);
    return;
  }

  cart.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");

    const itemDetails = document.createElement("div");
    itemDetails.classList.add("cart-item-details");

    const itemImage = document.createElement("img");
    itemImage.classList.add("cart-item-image");
    itemImage.src = item.image; 
    itemDetails.appendChild(itemImage);

    const itemName = document.createElement("span");
    itemName.classList.add("cart-item-name");
    itemName.textContent = item.name; 
    itemDetails.appendChild(itemName);

    const quantityButtons = document.createElement("div");
    quantityButtons.classList.add("quantity-buttons");

    const minusButton = document.createElement("button");
    minusButton.textContent = "-";
    minusButton.addEventListener("click", () => {
      updateQuantity(index, -1);
    });
    quantityButtons.appendChild(minusButton);

    const quantitySpan = document.createElement("span");
    quantitySpan.textContent = item.quantity;
    quantityButtons.appendChild(quantitySpan);

    const plusButton = document.createElement("button");
    plusButton.textContent = "+";
    plusButton.addEventListener("click", () => {
      updateQuantity(index, 1);
      
    });
    quantityButtons.appendChild(plusButton);

    itemDetails.appendChild(quantityButtons);

    const itemPrice = document.createElement("span");
    itemPrice.classList.add("cart-item-price");
    itemPrice.textContent = "$" + (item.price * item.quantity).toFixed(2); 
    itemElement.appendChild(itemDetails);
    itemElement.appendChild(itemPrice);

    // Add remove button
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
        removeItem(index);
    });
    itemElement.appendChild(removeButton);

    cartItemsContainer.appendChild(itemElement);
  });

  updateCartSummary();
}

// Function to remove an item from the cart
function removeItem(index) {
  cart.splice(index, 1);
  displayCartItems();
  saveCartToLocalStorage();
}

// Function to update item quantity
function updateQuantity(index, amount) {
  cart[index].quantity += amount;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1); // Remove item if quantity reaches 0
  }
  displayCartItems(); // Re-render the cart items
  saveCartToLocalStorage(); // Save the updated cart to localStorage
}

// Function to update cart summary
function updateCartSummary() {
  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  document.getElementById("cart-subtotal").textContent = "$" + subtotal.toFixed(2);
  // You can add logic to calculate shipping, tax, and total based on your requirements
  document.getElementById("cart-shipping").textContent = "$0.00";
  document.getElementById("cart-tax").textContent = "$0.00";
  document.getElementById("cart-total").textContent = "$" + subtotal.toFixed(2);
}

// Function to save the cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to get the cart from localStorage
function getCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    return JSON.parse(storedCart);
  } else {
    return []; // Return an empty array if no cart exists
  }
}

// Function to remove all items from the cart
function removeAllItems() {
  cart = [];
  displayCartItems();
  saveCartToLocalStorage();
  alert("You remove all items");
}

// Load the cart from localStorage when the page loads
cart = getCartFromLocalStorage();
displayCartItems(); // Display cart items on page load
updateCartSummary(); // Update cart summary on page load

// Add event listener for "Remove All" button
const removeAllButton = document.getElementById("remove-all-button");
removeAllButton.addEventListener("click", removeAllItems);
