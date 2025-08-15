import renderCheckoutHeader from "./checkout/middleHeaderItem.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { hideHeaderOnScroll } from "./checkout/hideHeader.js";

// Initialize scroll behavior for the checkout header
hideHeaderOnScroll();

// Render initial UI elements using top-level code in ESM
renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();
