import { cart, removeFromCart, updateDeliveryOption, totalQuantity } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import { getDeliveryOptionById } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
  let productPrice = 0;
  let shippingPrice = 0;

  // Total number of items
  const quantity = totalQuantity();

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPrice += product.price * cartItem.quantity;

    const deliveryOption = getDeliveryOptionById(cartItem.deliveryOptions);
    shippingPrice += deliveryOption.price;
  });

  const totalBeforeTax = productPrice + shippingPrice;
  const tax = totalBeforeTax * 0.15;
  const totalPrice = totalBeforeTax + tax;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items (${quantity}):</div>
      <div class="payment-summary-money">${formatCurrency(productPrice)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">${formatCurrency(shippingPrice)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money js-payment-summary-money">${formatCurrency(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (15%):</div>
      <div class="payment-summary-money">${formatCurrency(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">${formatCurrency(totalPrice)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">Place your order</button>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  // Place order handler
  document.querySelector(".js-place-order").addEventListener("click", () => {
    alert("Your order has been placed successfully!");

    // Clear cart in memory and localStorage
    cart.length = 0;
    localStorage.setItem("cart", JSON.stringify(cart));

    // Refresh payment summary
    renderPaymentSummary();

    // Remove cart items from DOM
    document.querySelectorAll(".js-cart-item-container").forEach(item => item.remove());

    window.dispatchEvent(new Event("cartUpdated"));
  });
}
