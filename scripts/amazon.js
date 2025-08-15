// Import modules
import { renderProductsGrid } from "./amazon/renderProductsGrid.js";
import { updateCartQuantity } from "./amazon/updateCartQuantity.js";
import { hideHeaderOnScroll } from "./amazon/hideHeader.js";

// Initialize header behavior and UI
hideHeaderOnScroll();
renderProductsGrid();
updateCartQuantity();

/*
Execution flow:
1. Browser loads the HTML and runs this module (type="module").
2. Top-level code in updateCartQuantity.js executes:
    - Sets initial cart quantity badge.
    - Registers a listener for 'cartUpdated'.
3. Whenever addToCart() dispatches 'cartUpdated', the listener updates the cart UI automatically.
*/
