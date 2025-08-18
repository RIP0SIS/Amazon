import { addToCart, cart, loadFromStorage, removeFromCart } from '../../data/cart.js';

/*
Best Practice Notes:
- Test each condition of an if-statement.
- Test coverage = how much of the code is tested.
- Flaky test = sometimes passes, sometimes fails.
- Mocks = replace a real method with a fake one (spyOn).
- Unit test = test one piece of code in isolation.
*/

describe('test suite: addToCart', () => {

  beforeEach(() => {
    // Mock localStorage.setItem for each test
    spyOn(localStorage, 'setItem');
  });

  it('adds an existing product to the cart', () => {
    // Mock localStorage.getItem with a product already in cart
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 1,
        deliveryOptions: '1'
      }]);
    });
    loadFromStorage();

    // Add the same product again
    addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");

    // Product quantity should increase
    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(2);

    // setItem should be called with updated cart
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify(cart));
  });

  it('adds a new product to the cart', () => {
    // Mock localStorage.getItem with empty cart
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    // Add two different products
    addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d", 5);

    // Both products should exist
    expect(cart.length).toBe(2);

    // setItem should be called twice
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify(cart));
  });
});

describe('test suite: removeFromCart', () => {
  beforeEach(() => {
    // Mock localStorage for remove tests
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          quantity: 1,
          deliveryOptions: '1'
        },{
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 3,
          deliveryOptions: '2'
        }
      ]);
    });
    loadFromStorage();
  });

  it('removes a product from the cart', () => {
    expect(cart.length).toBe(2);

    // Remove one product
    removeFromCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");

    // Only second product should remain
    expect(cart.length).toBe(1);
    expect(cart[0].productId).toBe("15b6fc6f-327a-4ec4-896f-486349e85a3d");

    // setItem should be called with updated cart
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify(cart));
  });

  it('does not remove a product that is not in the cart', () => {
    expect(cart.length).toBe(2);

    // Try to remove product that doesn’t exist
    removeFromCart('non-existing-product-id');

    // Cart stays the same
    expect(cart.length).toBe(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});
