// Normalize data: cart stores only productId, quantity, and delivery option
// Product details are accessed via imports to avoid duplication

import {
  cart,
  removeFromCart,
  updateDeliveryOption,
  updateQuantity,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOptionById,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  // Generate cart item HTML
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOptionById(cartItem.deliveryOptions);
    const deliveryDate = dayjs()
      .add(deliveryOption.deliveryDays, "day")
      .format("dddd, MMMM D");

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${
        product.id
      }">
        <div class="delivery-date">Delivery date: ${deliveryDate}</div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${product.image}" />
          <div class="cart-item-details">
            <div class="product-name js-product-name-${product.id}">${
      product.name
    }</div>
            <div class="product-price js-product-price-${
              product.id
            }">${product.getPrice()}</div>
            <div class="product-quantity js-product-quantity-${product.id}">
              <span>Quantity: <span class="quantity-label js-quantity-label" data-product-id="${
                product.id
              }">${cartItem.quantity}</span></span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                product.id
              }">Update</span>
              <input class="quantity-input js-quantity-input" data-product-id="${
                product.id
              }">
              <span class="save-quantity-link link-primary js-save-link" data-product-id="${
                product.id
              }">Save</span>
              <span class="delete-quantity-link js-delete-link-${
                product.id
              } link-primary js-delete-link" data-product-id="${
      product.id
    }">Delete</span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${deliveryOptionsHTML(product, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML(product, cartItem) {
    return deliveryOptions
      .map((option) => {
        const date = dayjs()
          .add(option.deliveryDays, "day")
          .format("dddd, MMMM D");
        const priceString =
          option.price === 0 ? "FREE" : `${formatCurrency(option.price)} -`;
        const isChecked = option.id === cartItem.deliveryOptions;

        return `
        <div class="delivery-option js-delivery-option js-delivery-option-${
          product.id
        }-${option.id}"
              data-product-id='${product.id}'
              data-delivery-option-id='${option.id}'>
          <input type="radio"
                  ${isChecked ? "checked" : ""}
                  class="delivery-option-input js-delivery-option-input-${
                    product.id
                  }-${option.id}"
                  name="delivery-option-${product.id}" />
          <div>
            <div class="delivery-option-date">${date}</div>
            <div class="delivery-option-price">${priceString} Shipping</div>
          </div>
        </div>
      `;
      })
      .join("");
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  // Update quantity: show input when "Update" clicked
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.dataset.productId;
      document
        .querySelector(`.update-quantity-link[data-product-id="${id}"]`)
        .classList.add("active");
      document
        .querySelector(`.js-quantity-label[data-product-id="${id}"]`)
        .classList.add("active");
      document
        .querySelector(`.js-quantity-input[data-product-id="${id}"]`)
        .classList.add("active");
      document
        .querySelector(`.js-save-link[data-product-id="${id}"]`)
        .classList.add("active");
    });
  });

  // Save new quantity
  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.dataset.productId;
      const input = document.querySelector(
        `.js-quantity-input[data-product-id="${id}"]`
      );
      updateQuantity(id, Number(input.value));

      // Refresh UI after update
      renderOrderSummary();
      renderPaymentSummary();
      window.dispatchEvent(new Event("cartUpdated"));
    });
  });

  // Delete item from cart
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      removeFromCart(link.dataset.productId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  // Change delivery option
  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      const { productId, deliveryOptionId } = option.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
