// Load orders from localStorage or initialize as empty array
export const orders = JSON.parse(localStorage.getItem('orders')) || [];

// Add a new order (placed at the front of the list)
export function addOrder(order) {
  if (order.length === 0) return;
  orders.unshift(order);
  saveToStorage();
}

// Persist orders to localStorage
export function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

// Retrieve order by ID
export function getOrder(orderId) {
  return orders.find(order => order.id === orderId);
}
