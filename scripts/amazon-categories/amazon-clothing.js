import { updateCartQuantity } from "../amazon/updateCartQuantity.js";
import { hideHeaderOnScroll } from "../amazon/hideHeader.js";
import { renderProductsGrid } from "../amazon/renderProductsGrid.js";
import { products, loadProductsAsyncFetch } from "../../data/products.js";


loadProductsAsyncFetch().then(() => {
  hideHeaderOnScroll();
  updateCartQuantity();
  const clothingItems = products.filter((p) => p.type === "clothing" || p.keywords.includes("hoodies"));
  renderProductsGrid(clothingItems);
});