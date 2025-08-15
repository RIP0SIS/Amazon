/*
When you do:

import { updateCartQuantity } from "./amazon/updateCartQuantity.js";
the entire top-level code inside updateCartQuantity.js runs once immediately — before your main script continues.

That means:

updateCartQuantity(); // runs once immediately
window.addEventListener("cartUpdated", updateCartQuantity); // listener is set up immediately
are executed as soon as the file is imported.

Hence no need to but everything inside a function, as anything outside of a function runs when the file loads
that one of the feature of ESM (Top-level code in modules is global to the module)
*/

import { cart, addToCart } from "../../data/cart.js";

  //cart in the amazon header
  export function updateCartQuantity() {
    let cartQuantity = 0;
  
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  }

  //Top-level code

  //call it once to set initial value
  updateCartQuantity();
  // update when reloading the page
  window.addEventListener("cartUpdated", updateCartQuantity);