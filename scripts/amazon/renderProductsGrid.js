import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { addToCart } from "../../data/cart.js";

export function renderProductsGrid(items = products) {

  let productsHTML = "";
  //.toFixed()  to take decimal points

  //using global scope
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

        ${ /* if-statement
          product.sizeChartLink 
            ? `<a href="${product.sizeChartLink}">Size chart</a>` 
            : ''
            */

          product.extraInfoHTML() //Polymorphism(using a method without knowing the exact type of object)
        }

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
  //rendering product to webpage
  document.querySelector(".js-products-grid").innerHTML = productsHTML;



             //Add to cart button click event
/*
How do we know which product to add?
Ans = Data Attribute
-is just another HTML attribute
-allows us to attach any information to an element
-syntax:  data-attribute-name:"attribute_value"  (use kebab case)
- (.dataset) property give all data attribute attached on element as object
- (.dataset.attributeName)  (camel case) give us data value as string
*/
document.querySelectorAll(".js-add-to-cart-button")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
  
      /*
          Steps
          1. Check if the product is already in the cart.
          2. If it is in the cart, increase the quantity.
          3. If it's not in the cart, add it to the cart.
        */

      const quantitySelector = document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`);
      const quantity = Number(quantitySelector.value);  

      addToCart(productId, quantity); //also dispatch a "cartUpdated" event
    });
});

}