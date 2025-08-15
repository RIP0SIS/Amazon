import { addToCart, cart, loadFromStorage, removeFromCart } from '../../data/cart.js';

/*
Best Practice: Test each condition of an if-statement
  Test Coverage
  = how much of the code is being tested
  (Try to maximize test coverage)

Flaky Test = test that sometimes passes and sometimes fails
Mocks = lets us replace a method with a fake version , using 'spyOn(object, 'methodName')' object
*/

//Unit test : test one piece of code
describe('test suite: addToCart', () => {

  beforeEach(() => {
    //Fake data
    spyOn(localStorage, 'setItem'); //not real localStorage
  });

  it('adds an existing product to the cart', () => {
    //a mock only last for 1 test

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 1,
        deliveryOptions: '1'
      }]);
    });
    loadFromStorage();

    addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");

    expect(cart.length).toBe(1); //same product, increase quantity

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify(cart));

    expect(cart[0].productId).toBe("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    expect(cart[0].quantity).toBe(2);
  });

  it('adds a new product to the cart', () => {
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });//fake data to localStorage
    loadFromStorage(); //returns empty array or passed data in callFake

    addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");  //add product to fake localStorage
    addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d", 5);

    expect(cart.length).toBe(2);

    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(2);

    //correct data received
    //only check the last call's argument
    expect(
      localStorage.setItem
    ).toHaveBeenCalledWith("cart", JSON.stringify(cart)); //(folderName, data)

    expect(cart[0].productId).toBe("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    expect(cart[0].quantity).toBe(1);
  });
});

describe('test suite: removeFromCart', () => {
  beforeEach(() => {
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
        }]);
    });
    loadFromStorage();
  });

  it('removes a product from the cart', () => {
    expect(cart.length).toBe(2);

    removeFromCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");

    expect(cart.length).toBe(1);
    expect(cart[0].productId).toBe("15b6fc6f-327a-4ec4-896f-486349e85a3d");

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify(cart));
  });

  it('does not remove a product that is not in the cart', () => {
    expect(cart.length).toBe(2);
    removeFromCart('non-existing-product-id');

    expect(cart.length).toBe(2); //cart should remain unchanged

    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(1);

  });
});