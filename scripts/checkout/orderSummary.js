/*
*de-duplicating the data or normalizing the data eg: 
cart.js access other data of a product using productId and use import to for rest of the data
so that we don't have to store the same data in multiple places
*/
//save the data
import { cart, removeFromCart, updateDeliveryOption, updateQuantity } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";  //ESM
import { deliveryOptions, getDeliveryOptionById } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary(){

  let cartSummaryHTML = ""; //store the HTML for the cart summary

  //Generate the HTML for the cart items
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

  /*
    let matchingProduct;
    //Find the product details using the productId
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });
  */
    // let matchingProduct = products.find(product => product.id === productId);

    let matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptions;

/*
    let deliveryOption;

    //deliveryOptions.js
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    }); //used in deliveryDate
*/
    const deliveryOption = getDeliveryOptionById(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "day");   //add days to today a/c to option
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
  <div class="cart-item-container 
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">Delivery date: ${dateString}</div>
    
    <div class="cart-item-details-grid">
      <img
        class="product-image"
        src="${matchingProduct.image}"
      />
      
      <div class="cart-item-details">
        <div class="product-name
        js-product-name-${matchingProduct.id}">
          ${matchingProduct.name}
        </div>
        <div class="product-price
        js-product-price-${matchingProduct.id}">
          ${matchingProduct.getPrice()}
        </div>
        <div class="product-quantity
        js-product-quantity-${matchingProduct.id}">
          <span>Quantity: <span class="quantity-label js-quantity-label"
          data-product-id="${matchingProduct.id}">${
            cartItem.quantity
          }</span></span>
          <span class="update-quantity-link link-primary js-update-link"
          data-product-id="${matchingProduct.id}">
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
      </div> <!-- closed correctly here -->
      
      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "day");
      const dateString = deliveryDate.format("dddd, MMMM D");
      
      const priceString = deliveryOption.price === 0
        ? 'FREE'
        : `${formatCurrency(deliveryOption.price)} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptions;

      html += `
      <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
      
      data-product-id = '${matchingProduct.id}'
      data-delivery-option-id = '${deliveryOption.id}'
      >
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
      `
    });

    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;



  //Handle the update button
  document.querySelectorAll('.js-update-link')
    .forEach((link) =>  {
      link.addEventListener('click', (event) => {
        const productId = link.dataset.productId;

        //Hide the update link and quantity
        document.querySelector(
          `.update-quantity-link[data-product-id="${productId}"]`
        ).classList.add("active");
        document.querySelector(`.js-quantity-label[data-product-id="${productId}"]`
        ).classList.add("active");

        //Show the input field and save link
        document.querySelector(`.js-quantity-input[data-product-id="${productId}"]`).classList.add("active");
        document.querySelector(`.js-save-link[data-product-id="${productId}"]`).classList.add("active");
      });
    });



  //Handle the save button
  document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', (event) => {
      const productId = link.dataset.productId;

      //show the update link and quantity
      document.querySelector(
        `.update-quantity-link[data-product-id="${productId}"]`
      ).classList.remove("active");
      document.querySelector(`.js-quantity-label[data-product-id="${productId}"]`
      ).classList.remove("active");

      //hide the input field and save link
      document.querySelector(`.js-quantity-input[data-product-id="${productId}"]`).classList.remove("active");
      document.querySelector(`.js-save-link[data-product-id="${productId}"]`).classList.remove("active");

      const quantityData = document.querySelector(`.js-quantity-input[data-product-id="${productId}"]`);
      const quantity = Number(quantityData.value);
      
      updateQuantity(productId, quantity);

      //use MVC to update the UI
      renderOrderSummary();

      renderPaymentSummary();

      window.dispatchEvent(new Event("cartUpdated"));
    });
  });



  //Handle the delete button
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      //update the cart when the delete link is clicked
      link.addEventListener('click', (event) => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        /*use DOM to update the webpage
          const container = document.querySelector(
            `.js-cart-item-container-${productId}`
          );
          container.remove(); */
        renderOrderSummary();  //use MVC to update the UI

        renderPaymentSummary();
      });
    });

  document.querySelectorAll('.js-delivery-option')
    .forEach((option) => {
      option.addEventListener('click', (event) => {
        const { productId, deliveryOptionId } = option.dataset;

        updateDeliveryOption(productId, deliveryOptionId);

        renderOrderSummary();

        renderPaymentSummary();
      });
    });
}