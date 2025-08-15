import { cart, addToCart } from "../../data/cart.js";

// Updates the cart quantity displayed in the header
export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

// Initialize and set up event listener for cart updates
updateCartQuantity();
window.addEventListener("cartUpdated", updateCartQuantity);
