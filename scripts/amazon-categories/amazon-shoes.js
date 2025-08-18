import { updateCartQuantity } from "../amazon/updateCartQuantity.js";
import { hideHeaderOnScroll } from "../amazon/hideHeader.js";
import { renderProductsGrid } from "../amazon/renderProductsGrid.js";
import { products, loadProductsAsyncFetch} from "../../data/products.js";

hideHeaderOnScroll();
updateCartQuantity();

loadProductsAsyncFetch().then(() => {
  hideHeaderOnScroll();
  updateCartQuantity();
  const applianceItems = products.filter(
    (p) => p.keywords && p.keywords.includes("footwear")
  );
  renderProductsGrid(applianceItems);
});
