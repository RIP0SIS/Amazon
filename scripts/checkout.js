import renderCheckoutHeader from "./checkout/middleHeaderItem.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { hideHeaderOnScroll } from "./checkout/hideHeader.js";
import { loadProductsAsyncFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";


/*
  Notes on async handling in this project:

  - Initially implemented with nested callbacks (hard to read).
  - Replaced with Promises for better structure.
  - Promise.all([]) used to run multiple async tasks in parallel.
  - Finally, migrated to async/await for cleaner, more readable code.
*/


// Load products & cart, then render checkout page
async function loadPage() {
  try {
    await Promise.all([
      loadProductsAsyncFetch(),
      loadCart()
    ]);

    // Initialize UI components after data is ready
    hideHeaderOnScroll();
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();

  } catch (error) {
    console.error('Error loading page:', error);
  }
}

// Run page loader
loadPage();