import renderCheckoutHeader from "./checkout/middleHeaderItem.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { hideHeaderOnScroll } from "./checkout/hideHeader.js";
//import '../data/cart-class.js';  //runs all the code inside the file without importing anything

hideHeaderOnScroll();

//Using top-level code feature of ESM
renderCheckoutHeader();

//update the webpage using function
renderOrderSummary();

renderPaymentSummary();
