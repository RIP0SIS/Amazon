import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart, updateDeliveryOption } from "../../data/cart.js";
import { renderPaymentSummary } from "../../scripts/checkout/paymentSummary.js"; 
import * as deliveryOptionsModule from "../../data/deliveryOptions.js"; 

/*
Integration Test = tests many units/pieces of code working together
Two things to test:
1. How the page looks
2. How the page behaves


Hooks (jasmine shorthand)
= lets us run some code for each test

Hooks in Jasmine
beforeEach() = runs code before each test
afterEach() = runs code after each test
beforeAll() = runs code before all tests
afterAll() = runs code after all tests
*/


describe('test suite: renderOrderSummary', () => {
  const productId1 = "bc2fc1b4-91f7-4b3a-9e0a-0e4a9c02d917";
  const productId2 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

  //run code before each test
  beforeEach(() => {
        document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      `;//element to render the order summary

      spyOn(localStorage, 'setItem'); //mock localStorage

      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([
          {
            productId: productId1,
            quantity: 1,
            deliveryOptions: '1'
          },{
            productId: productId2,
            quantity: 3,  
            deliveryOptions: '2'
          }]);
      });
      loadFromStorage(); //load cart from localStorage
      renderOrderSummary();
  });

  afterEach(() => {
    //clean up
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('display the cart', () => {
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

  it('remove a product', () => {

      document.querySelector(`.js-delete-link-${productId1}`).click(); //simulate click on delete link
      expect(
        document.querySelectorAll('.js-cart-item-container').length
      ).toBe(1);

      expect(
        document.querySelector(`.js-cart-item-container-${productId1}`)
      ).toEqual(null);  //or .toBeNull()
      expect(
        document.querySelector(`.js-cart-item-container-${productId2}`)
      ).not.toEqual(null);

      expect(cart.length).toBe(1);
      expect(cart[0].productId).toBe(productId2);
  });

  it('product name are displayed', () => {
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerHTML
    ).toContain("Lifelong FitPro LLTM09");
  });

  it('product price are displayed', () => {
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toContain("₹14,999.00");
  });

  it('update delivery option', () => {
    const deliveryOption = document.querySelector(
      `.js-delivery-option-${productId1}-2`
    );
    deliveryOption.click();

    const deliveryOptionInput = document.querySelector(
      `.js-delivery-option-input-${productId1}-2`
    );
    expect(deliveryOptionInput.checked).toBeTrue();

    expect(
      cart.length
    ).toBe(2);

    expect(
      cart[0].deliveryOptions
    ).toBe('2');

    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(1);

    expect(
      cart[1].deliveryOptions
    ).toBe('2');

    expect(
      cart[1].productId
    ).toBe(productId2);

    const TotalBeforeTax = document.querySelector('.js-payment-summary-money');
    expect(
      TotalBeforeTax.innerText
    ).toContain("₹17,407.00");

    expect(
      document.querySelector('.js-payment-summary-tax')
    ).toEqual(null);
  });

  it('returns false and does not update when delivery option ID is invalid', () => {
    // Mock getDeliveryOptionById so invalid IDs return null
    spyOn(deliveryOptionsModule, 'getDeliveryOptionById').and.returnValue(null);

    const originalCart = JSON.parse(JSON.stringify(cart));

    const result = updateDeliveryOption(productId1, '999'); // invalid

    expect(result).toBe(false); // <-- must match your real function's return
    expect(cart).toEqual(originalCart); // cart unchanged
    expect(localStorage.setItem).not.toHaveBeenCalled(); // no save
  });

});