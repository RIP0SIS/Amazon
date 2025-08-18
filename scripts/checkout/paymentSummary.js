import { cart, removeFromCart, updateDeliveryOption, totalQuantity } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import { getDeliveryOptionById } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  
  let productPrice = 0;
  let shippingPrice = 0;

  // Get total quantity of items in cart
  const quantity = totalQuantity();

  cart.forEach((cartItem) => {
    // Calculate product price
    let product = getProduct(cartItem.productId);
    productPrice += product.priceCents * cartItem.quantity;

    // Calculate delivery charge
    const deliveryOption = getDeliveryOptionById(cartItem.deliveryOptionId);
    shippingPrice += deliveryOption.priceCents;
  });

  const totalBeforeTax = productPrice + shippingPrice;
  const tax = totalBeforeTax * 0.10;
  const totalPrice = Math.round(totalBeforeTax + tax);

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

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
        <div class="payment-summary-money
        js-payment-summary-money">${formatCurrency(totalBeforeTax)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">${formatCurrency(tax)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">${formatCurrency(totalPrice)}</div>
      </div>

      <button class="place-order-button button-primary
      js-place-order">
        Place your order
      </button>
  `;

  document.querySelector(".js-payment-summary")
    .innerHTML = paymentSummaryHTML;

  const placeOrderButton = document.querySelector(".js-place-order");
    
  // Disable button if cart is empty
  if (cart.length === 0) {
    placeOrderButton.disabled = true;
    placeOrderButton.classList.add("cursor-not-allowed");
  } else {
    placeOrderButton.disabled = false;
    placeOrderButton.classList.remove("cursor-not-allowed");
  }
  
  // Handle placing an order (send request to backend)
  placeOrderButton.addEventListener("click", async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {   
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });

        const order = await response.json(); // Backend response
        addOrder(order); // Save order to localStorage
        
        // Clear cart from memory and storage
        cart.length = 0;
        localStorage.setItem("cart", JSON.stringify(cart));

        // Notify other parts of app
        window.dispatchEvent(new Event("cartUpdated"));

        // Redirect to orders page
        window.location.href = "orders.html";

      } catch (error) {
        console.error('Error placing order:', error);
        alert('There was an error placing your order. Please try again later.');
      }
    });
}
