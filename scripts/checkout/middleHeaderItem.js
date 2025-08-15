import { totalQuantity } from "../../data/cart.js";

export default function renderCheckoutHeader() {
  const cartQuantity = totalQuantity();
  const middleHeaderItem = document.querySelector(".js-checkout-header-middle-section");

  // Not exist
  if(!middleHeaderItem) return;
  // If cart is empty
  if (cartQuantity === 0) {
    middleHeaderItem.innerHTML = `
      Checkout (<a class="return-to-home-link" href="amazon.html">No items</a>)
    `;
  } else {
    middleHeaderItem.innerHTML = `
      Checkout (<a class="return-to-home-link" href="amazon.html">
        ${cartQuantity} ${cartQuantity === 1 ? "item" : "items"}
      </a>)
    `;
  }
}

renderCheckoutHeader();

window.addEventListener('cartUpdated', renderCheckoutHeader);
