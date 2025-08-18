// Order summary rendering and cart interactions
import { cart, removeFromCart, updateDeliveryOption, updateQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions, getDeliveryOptionById } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  // Generate HTML for each cart item
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    const deliveryOption = getDeliveryOptionById(cartItem.deliveryOptionId);

    // Calculate estimated delivery date
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "day");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
      <div class="cart-item-container 
        js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">Delivery date: ${dateString}</div>
        
        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}" />
          
          <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${matchingProduct.id}">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>Quantity: 
                <span class="quantity-label js-quantity-label" data-product-id="${matchingProduct.id}">
                  ${cartItem.quantity}
                </span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input" data-product-id="${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
                Save
              </span>
              <span class="delete-quantity-link 
                js-delete-link-${matchingProduct.id}
                link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
          
          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  // Generate delivery options HTML
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "day");
      const dateString = deliveryDate.format("dddd, MMMM D");
      
      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
          data-product-id='${matchingProduct.id}'
          data-delivery-option-id='${deliveryOption.id}'>
          
          <input
            type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
            name="delivery-option-${matchingProduct.id}"
          />
          <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString} Shipping</div>
          </div>
        </div>
      `;
    });

    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  // Handle update quantity
  document.querySelectorAll('.js-update-link')
    .forEach((link) =>  {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        // Hide labels, show input + save
        document.querySelector(`.update-quantity-link[data-product-id="${productId}"]`).classList.add("active");
        document.querySelector(`.js-quantity-label[data-product-id="${productId}"]`).classList.add("active");
        document.querySelector(`.js-quantity-input[data-product-id="${productId}"]`).classList.add("active");
        document.querySelector(`.js-save-link[data-product-id="${productId}"]`).classList.add("active");
      });
    });

  // Handle save quantity
  document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        // Restore labels, hide input + save
        document.querySelector(`.update-quantity-link[data-product-id="${productId}"]`).classList.remove("active");
        document.querySelector(`.js-quantity-label[data-product-id="${productId}"]`).classList.remove("active");
        document.querySelector(`.js-quantity-input[data-product-id="${productId}"]`).classList.remove("active");
        document.querySelector(`.js-save-link[data-product-id="${productId}"]`).classList.remove("active");

        const quantityData = document.querySelector(`.js-quantity-input[data-product-id="${productId}"]`);
        const quantity = Number(quantityData.value);
        
        updateQuantity(productId, quantity);

        // Re-render UI
        renderOrderSummary();
        renderPaymentSummary();
        window.dispatchEvent(new Event("cartUpdated"));
      });
    });

  // Handle delete item
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        // Refresh UI
        renderOrderSummary();
        renderPaymentSummary();
      });
    });

  // Handle delivery option change
  document.querySelectorAll('.js-delivery-option')
    .forEach((option) => {
      option.addEventListener('click', () => {
        const { productId, deliveryOptionId } = option.dataset;

        updateDeliveryOption(productId, deliveryOptionId);

        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}
