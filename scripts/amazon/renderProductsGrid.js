import { products, loadProductsAsyncFetch } from "../../data/products.js";
import { addToCart } from "../../data/cart.js";
import productSearch from "./productSearch.js";

// Render product grid (with search & filtering support)
export async function renderProductsGrid(items = products) {
  let productsHTML = "";

  // Load products if not already available
  if (!products || products.length === 0) {
    await loadProductsAsyncFetch();
    items = products;
  }

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = items;

  // Filter products by search query
  if (search) {
    // Split by comma → ["hoodies", "robe", "tshirt"]
  const searchKeywords = search.split(",").map(k => k.trim().toLowerCase());

  filteredProducts = products.filter((product) => {
    const keywords = product.keywords.join(" ").toLowerCase();

    // Match if ANY search keyword is found in product keywords
    return searchKeywords.some(keyword => keywords.includes(keyword));

    });
  }

  // Build product cards
  filteredProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container" data-product-id="${product.id}">
        <div class="product-image-container">
          <img
            class="product-image js-product-image"
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
          <div class="product-rating-count link-primary">
            ${product.rating.count.toLocaleString("en-IN")}
          </div>
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
            ? `<a href="../../images/appliance-warranty.png" target='_blank' class="size-chart-link">Warranty</a>`
            : ""
        }

        ${ 
          product.extraInfoHTML() // Uses polymorphism: object decides what extra info to render
        }

        ${
          product.keywords.includes("shoes")
            ? `<a href="../../images/shoe_size_chart.png" target='_blank' class="size-chart-link">Size</a>`
            : ""
        }
        
        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/check-mark.png" />
          Added
        </div>

        <button 
          class="add-to-cart-button button-primary js-add-to-cart-button" 
          data-product-id="${product.id}" 
          data-product-name="${product.name}">
          Add to Cart
        </button>
      </div>
    `;
  });

  // Handle empty search results
  if (filteredProducts === undefined || filteredProducts.length == 0) {
    document.querySelector('.js-products-grid')
      .innerHTML = '<div class="empty-results-message"> No products matched your search. </div>';

    return productSearch();
  }

  // Insert product cards into DOM
  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  // Add "Add to Cart" button handlers
  document.querySelectorAll(".js-add-to-cart-button")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.productId;
        const quantitySelector = document.querySelector(
          `.js-quantity-selector[data-product-id="${productId}"]`
        );
        const quantity = Number(quantitySelector.value);  

        addToCart(productId, quantity);
      });
  });

  // Enable live product search
  productSearch();
}
