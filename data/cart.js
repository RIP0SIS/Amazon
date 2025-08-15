// Cart data storage
export let cart;
loadFromStorage(); // Initialize cart from localStorage

// Load cart from localStorage (fallback to empty array)
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

// Get total quantity of all items
export function totalQuantity() {
  return cart.reduce((acc, item) => acc + item.quantity, 0);
}

// Save current cart to localStorage
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Track active timeout IDs for "Added to cart" messages
const timeoutIds = {};

// Show temporary "Added to cart" message
function showAddedToCartMessage(productId) {
  const element = document.querySelector(`.js-added-to-cart-${productId}`);
  if (!element) return;

  element.classList.add("active");

  if (timeoutIds[productId]) {
    clearTimeout(timeoutIds[productId]);
  }

  timeoutIds[productId] = setTimeout(() => {
    element.classList.remove("active");
    delete timeoutIds[productId];
  }, 2000);
}

// Add product to cart or update its quantity
export function addToCart(productId, quantity = 1) {
  let matchingItem = cart.find(item => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptions: '1'
    });
  }

  saveToStorage();
  showAddedToCartMessage(productId);
  window.dispatchEvent(new Event("cartUpdated"));
}

// Remove product from cart
export function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
  saveToStorage();
  window.dispatchEvent(new Event("cartUpdated"));
}

// Update delivery option for a specific product
export function updateDeliveryOption(productId, deliveryOptionId) {
  const validIds = ['1', '2', '3'];
  if (!validIds.includes(deliveryOptionId)) return false;

  let matchingItem = cart.find(item => item.productId === productId);
  if (matchingItem) {
    matchingItem.deliveryOptions = deliveryOptionId;
    saveToStorage();
  }
  return true;
}

// Update quantity for a specific product
export function updateQuantity(productId, quantity) {
  let matchingItem = cart.find(item => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity = quantity;
    saveToStorage();
  } else {
    console.error(`Product with ID ${productId} not found in cart.`);
  }
}
