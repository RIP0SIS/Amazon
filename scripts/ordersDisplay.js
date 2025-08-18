import { renderOrdersGrid } from './order/renderOrderGrid.js';
import { hideHeaderOnScroll } from './order/hideOrderHeader.js';

// Initialize page features
hideHeaderOnScroll();
renderOrdersGrid();

// Re-render orders when the data is updated
window.addEventListener('ordersUpdated', () => {
  renderOrdersGrid();
});
