import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { addToCart } from "../../data/cart.js";

/**
 * Renders the product grid on the webpage.
 */
export function renderProductsGrid(items = products) {

  let productsHTML = "";

  // Generate HTML for each product item
  items.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img
            class="product-image"
            src="${product.image}"
          />
        </div>
        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>
        <div class="product-rating-container">
          <img
            class="product-rating-stars"
            src="${product.getStarsUrl()}"
          />
          <div class="product-rating-count link-primary">${product.rating.count.toLocaleString(
            "en-IN"
          )}</div>
        </div>
        <div class="product-price">
          ${product.getPrice()}
        </div>
        <div class="product-quantity-container">
          <select class="js-quantity-selector" data-product-id="${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${
          product.keywords.includes("appliances")
            ? `<a href="../../images/appliance-warranty.png" target = '_blank' class="size-chart-link">Warranty</a>`
            : ""
        }

        ${product.extraInfoHTML()} <!-- Polymorphic method to add extra details -->

        ${
          product.keywords.includes("shoes")
            ? `<a href="../../images/shoe_size_chart.png" target = '_blank' class="size-chart-link">Size</a>`
            : ""
        }
        
        <div class="product-spacer"></div>
        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/check-mark.png" />
          Added
        </div>
        <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${
          product.id
        }">Add to Cart</button>
      </div>
    `;
  });

  // Insert generated product HTML into the DOM
  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  /**
   * Attach click event listeners to all "Add to Cart" buttons.
   * Each button uses a data attribute to identify the product being added.
   */
  document.querySelectorAll(".js-add-to-cart-button")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.productId;

        const quantitySelector = document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`);
        const quantity = Number(quantitySelector.value);  

        // Add product to cart with selected quantity
        addToCart(productId, quantity);
      });
    });
}
