/*
import * as cartModule from '../data/cart.js';
cartModule.cart
cartModule.addToCart(productId);
*/

//Using top-level code feature of ESM
import { renderProductsGrid } from "./amazon/renderProductsGrid.js";
import { updateCartQuantity } from "./amazon/updateCartQuantity.js";
import { hideHeaderOnScroll } from "./amazon/hideHeader.js";

hideHeaderOnScroll();

renderProductsGrid();

updateCartQuantity()


/*
-Execution flow in your case
  Browser loads your HTML.

  <script type="module" src="amazon.js"> runs.

  amazon.js imports updateCartQuantity.js

  updateCartQuantity.js runs top-level code:

  Calls updateCartQuantity() once (sets initial cart badge).

  Registers cartUpdated event listener.

  Whenever addToCart() calls

    window.dispatchEvent(new Event("cartUpdated"));
    the listener in updateCartQuantity.js runs updateCartQuantity() again → UI updates live.
*/



