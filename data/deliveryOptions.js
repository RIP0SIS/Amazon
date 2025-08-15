export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  price: 0
}, {
  id: '2',
  deliveryDays: 3,
  price: 199,
}, {
  id: '3',
  deliveryDays: 1,
  price: 499
}];

export function getDeliveryOptionById(deliveryOptionId) {
  return deliveryOptions.find(option => option.id === deliveryOptionId) ||
  deliveryOptions[0];
}