// Cart module - handles cart state, storage, and updates
export let cart;

// Load cart from localStorage on module load
loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

export function totalQuantity() {
  return cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Track active timeouts for "added to cart" messages
const timeoutIds = {};

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

export function addToCart(productId, quantity = 1) {
  let matchingItem = cart.find(cartItem => productId === cartItem.productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: "1" // default option
    });
  }
  saveToStorage();
  showAddedToCartMessage(productId);

  window.dispatchEvent(new Event("cartUpdated"));
}

export function removeFromCart(productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  saveToStorage();
  window.dispatchEvent(new Event("cartUpdated"));
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const validIds = ["1", "2", "3"];
  if (!validIds.includes(deliveryOptionId)) return false;

  let matchingItem = cart.find(cartItem => productId === cartItem.productId);
  if (matchingItem) {
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
  return true;
}

// Update item quantity in the cart
export function updateQuantity(productId, quantity) {
  let matchingItem = cart.find(cartItem => productId === cartItem.productId);

  if (matchingItem) {
    if(quantity >= 1){
      matchingItem.quantity = quantity;  //replace
      saveToStorage();
    } else if (quantity === 0) {
      return removeFromCart(productId);
      //return because removeFromCart() also dispatch cartUpdated event
    }
  } else {
    console.error(`Product with ID ${productId} not found in cart.`);
  }
}

// Fetch latest cart from backend (demo endpoint)
export async function loadCart() {
  const response = await fetch("https://supersimplebackend.dev/Cart");
  const data = await response.text();
  console.log(data);
}
