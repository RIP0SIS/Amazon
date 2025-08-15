import { updateCartQuantity } from "../amazon/updateCartQuantity.js";
import { hideHeaderOnScroll } from "../amazon/hideHeader.js";
import { renderProductsGrid } from "../amazon/renderProductsGrid.js";
import { products } from "../../data/products.js";

hideHeaderOnScroll();
updateCartQuantity();

// Filter clothing products and render them
const clothingItems = products.filter((p) => p.type === "clothing");
renderProductsGrid(clothingItems);
