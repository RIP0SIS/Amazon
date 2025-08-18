import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart, updateDeliveryOption } from "../../data/cart.js";
import { renderPaymentSummary } from "../../scripts/checkout/paymentSummary.js"; 
import * as deliveryOptionsModule from "../../data/deliveryOptions.js";
import { loadProductsAsyncFetch, getProduct } from "../../data/products.js";

/**
 * Integration Test: renderOrderSummary
 * Covers both UI rendering and functional behaviors such as:
 * - Displaying cart items
 * - Removing products
 * - Updating delivery options
 * - Validating product details
 */
describe('test suite: renderOrderSummary', () => {
  const productId1 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  const productId2 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

  // Load products before all tests
  beforeAll(async () => {
    await loadProductsAsyncFetch();
  });

  // Set up test DOM and mock localStorage before each test
  beforeEach(() => {
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, 'setItem'); // mock saving
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryOptionId: '1'
        },{
          productId: productId2,
          quantity: 3,  
          deliveryOptionId: '2'
        }
      ]);
    });

    loadFromStorage();
    renderOrderSummary();
  });

  // Clean up test DOM after each test
  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('displays the cart with correct quantities', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toBe(2);
    
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 1");

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 3");
  });

  it('removes a product when delete is clicked', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toBe(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toBeNull();
    
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toBeNull();

    expect(cart.length).toBe(1);
    expect(cart[0].productId).toBe(productId2);
  });

  it('displays product names correctly', () => {
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerHTML
    ).toContain("Intermediate Size Basketball");
  });

  it('displays product prices correctly', () => {
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toContain("₹2,095.00");
  });

  it('updates delivery option correctly', () => {
    const deliveryOptionInput = document.querySelector(
      `.js-delivery-option-input-${productId1}-2`
    );

    expect(deliveryOptionInput).not.toBeNull();

    deliveryOptionInput.click();

    expect(deliveryOptionInput.checked).toBeTrue();
    expect(cart.length).toBe(2);
    expect(cart[0].deliveryOptionId).toBe('2');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[1].deliveryOptionId).toBe('2');
    expect(cart[1].productId).toBe(productId2);

    const TotalBeforeTax = document.querySelector('.js-payment-summary-money');
    expect(TotalBeforeTax.innerText).toContain("₹6,363.00");

    expect(
      document.querySelector('.js-payment-summary-tax')
    ).toBeNull();
  });

  it('does not update when delivery option ID is invalid', () => {
    spyOn(deliveryOptionsModule, 'getDeliveryOptionById').and.returnValue(null);

    const originalCart = JSON.parse(JSON.stringify(cart));
    const result = updateDeliveryOption(productId1, '999'); // invalid

    expect(result).toBe(false);
    expect(cart).toEqual(originalCart);
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});