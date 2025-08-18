import { getOrder } from '../data/orders.js';
import { getProduct, loadProductsAsyncFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateCartQuantity } from './amazon/updateCartQuantity.js';
import { productSearch } from './amazon/productSearch.js';

async function renderOrderTracking(){

  await loadProductsAsyncFetch();
  updateCartQuantity();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProduct(productId);

  let productDetails; //estimated delivery time, name, quantity.
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime); // keep as dayjs object

  // compute progress
  let percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
  percentProgress = Math.min(Math.max(percentProgress, 0), 100);

  // message
  const deliveryMessage = today.isBefore(deliveryTime) ? 'Arriving on' : 'Delivered on';

  // format for UI only
  const deliveryTimeText = deliveryTime.format('dddd, MMMM D');

  const trackingHtml = `
    <div class="order-tracking js-order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          ${deliveryMessage} ${deliveryTimeText}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${percentProgress < 33 ? 'current-status' : ''}">
            Preparing
          </div>
          <div class="progress-label ${
            percentProgress >= 33 && percentProgress < 100 ? 'current-status' : ''
          }">
            Shipped
          </div>
          <div class="progress-label ${percentProgress >= 100 ? 'current-status' : ''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${percentProgress}%;"></div>
        </div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHtml;

  productSearch();
}

renderOrderTracking().catch((error) => {
  console.error('Error rendering order tracking:', error);
});