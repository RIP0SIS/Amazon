import { orders, saveToStorage } from '../../data/orders.js';
import { getProduct, loadProductsAsyncFetch } from '../../data/products.js'; // to get product info by id
import formatCurrency from '../utils/money.js';
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { cart, addToCart } from '../../data/cart.js';
import { updateCartQuantity } from '../amazon/updateCartQuantity.js';
import { productSearch } from '../amazon/productSearch.js';


function removeFromOrders(orderId, productId) {
  // Find the order by orderId
  const orderIndex = orders.findIndex(order => order.id === orderId);

  if (orderIndex === -1) return; // No such order found

  const order = orders[orderIndex];

  // Filter out the product from products array, keeping the rest
  order.products = order.products.filter(p => p.productId !== productId);

  // Recalculate total
  if (order.products.length > 0) {
    order.totalCostCents = order.products.reduce((total, p) => {
      const productInfo = getProduct(p.productId);
      return total + (productInfo ? productInfo.priceCents * p.quantity : 0);
    }, 0);
  } else {
    // If no products left then remove the whole order
    orders.splice(orderIndex, 1);
  }
  saveToStorage();

  window.dispatchEvent(new Event("ordersUpdated"));
}


export async function renderOrdersGrid() {

  await loadProductsAsyncFetch();
  let ordersHTML = '';

  updateCartQuantity();

  if (orders.length === 0) {
    document.querySelector('.js-orders-grid').innerHTML = '<p>No orders found.</p>';
    return;
  }

  /*
  Backend:-
    orderIndex:  .orderTime,  .totalCostCents, .id, .products
    productDetails: .productId, .quantity, .estimatedDeliveryTime

  */

  orders.forEach((order) => {
    const orderTimeString = dayjs(order.orderTime).format('MMMM D');

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
      </div>
    `;

  });

  //Each order has a list of products
  function productsListHTML (order) {
    let productsListHTML = '';

    order.products.forEach((productDetails) => {
      const product = getProduct(productDetails.productId);

      if (!product) return;

      //url parameter: a href="tracking.html?orderId=${order.id}&productId=${product.id}"

      productsListHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>
        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${
              dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
            }
          </div>
          <div class="product-quantity">
            Quantity: ${productDetails.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.id}" data-order-id="${order.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
            <span class="buy-again-success">✓ Added</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
          <button class="cancel-order-button
          js-cancel-order" data-order-id="${order.id}" data-product-id="${product.id}">
            Cancel order
          </button>
        </div>
      `;
    });

    return productsListHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  const addedMessageTimeouts = {};

  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      const orderId = button.dataset.orderId;
      const productId = button.dataset.productId;
      const prevMessageTimeouts = addedMessageTimeouts[orderId];

      // Clear any existing timeout for this product
      if (prevMessageTimeouts && prevMessageTimeouts[productId]) {
        clearTimeout(prevMessageTimeouts[productId]);
      }

      // Add the class to show the success message
      button.classList.add('is-buying-again');

      // Set a new timeout to remove the class after 2 seconds
      addedMessageTimeouts[orderId] = {
        [productId]: setTimeout(() => {
          button.classList.remove('is-buying-again');

          delete addedMessageTimeouts[orderId][productId];
        }, 2000)
      };

      // Next, add the order to the cart and save to storage
      addToCart(productId);

      updateCartQuantity();

    });
  }); 



  document.querySelectorAll('.js-cancel-order').forEach((button) => {
    button.addEventListener('click', () => {
      const orderId = button.dataset.orderId;
      const productId = button.dataset.productId;

      removeFromOrders(orderId, productId);
      renderOrdersGrid();
    });
  });

  productSearch();

}
