import { updateCartQuantity } from "../amazon/updateCartQuantity.js";
import { hideHeaderOnScroll } from "../amazon/hideHeader.js";
import { renderProductsGrid } from "../amazon/renderProductsGrid.js";
import { products } from "../../data/products.js";

hideHeaderOnScroll();
updateCartQuantity();

// Filter footwear products and render them
const footwearItems = products.filter(
  (p) => p.keywords && p.keywords.includes("footwear")
);
renderProductsGrid(footwearItems);
