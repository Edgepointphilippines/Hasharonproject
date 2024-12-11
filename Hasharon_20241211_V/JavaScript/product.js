let cart = []; // Your cart array

// Function to add an item to the cart
function addToCart(item) {
  cart.push(item);
  updateCartCount();
  saveCartToLocalStorage(); // Save the cart to localStorage
  console.log("Item added to cart:", item);
}

// Function to update the cart count display
function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.textContent = cart.length; // Just set the text content to the cart length
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

    cartItemsContainer.appendChild(itemElement);
  });

  updateCartSummary();
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

// Get all the "Add to Cart" buttons
const cartButtons = document.querySelectorAll(".cart-button");

// Add event listeners to each button
cartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.parentElement;
    const itemName = category.querySelector("h3").textContent;
    const imageSrc = category.querySelector("img").src; // Get the image source
    
    // Add the item to the cart
    addToCart({
      name: itemName,
      image: imageSrc,
      price: 100,
      quantity: 1,
      
    });
    alert("Product added to cart");
  });
});

// Load the cart from localStorage when the page loads
cart = getCartFromLocalStorage();
updateCartCount();
displayCartItems();