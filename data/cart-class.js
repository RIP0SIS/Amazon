//class : object generator  (PascalCase)

/*
A class is a blueprint or a template that defines the common characteristics (attributes) and behaviors (methods) of a group of objects.
It's a logical construct that describes what an object of that type will look like and what it can do. 

An object is an instance of a class. It is a concrete entity created from the class blueprint,
each object created from the same class is unique and exists in memory.


Constructors are special methods in class used to initialize objects when they are created. (setup code), not return anything

this : points to the object that we generate, let an object access its own properties and methods

private: only accessible within the class, #
*/
class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  totalQuantity() {
    return this.cartItems.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.quantity; 
    }, 0);
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  timeoutIds = {};

  showAddedToCartMessage(productId) {
    const element = document.querySelector(`.js-added-to-cart-${productId}`);
    if (!element) return;

    element.classList.add("active");

    if (this.timeoutIds[productId]) {
      clearTimeout(this.timeoutIds[productId]);
    }

    this.timeoutIds[productId] = setTimeout(() => {
      element.classList.remove("active");
      delete this.timeoutIds[productId];
    }, 2000);
  }

  addToCart(productId, quantity = 1) {
    let matchingItem = this.cartItems.find(cartItem => productId === cartItem.productId);
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptions: '1'
      });
    }
    this.saveToStorage();
    this.showAddedToCartMessage(productId);
    window.dispatchEvent(new Event("cartUpdated"));
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart; //update global this.cartItems variable
    this.saveToStorage();

    window.dispatchEvent(new Event("cartUpdated"));
  }

  updateDeliveryOption(productId ,deliveryOptionId){
      const validIds = ['1', '2', '3'];

      if (!validIds.includes(deliveryOptionId)) {
        return false; // invalid option
      }

      const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

      if (matchingItem) {
        matchingItem.deliveryOptions = deliveryOptionId;
        this.saveToStorage();
      }
      return true;
  }

  updateQuantity(productId, quantity) {
    let matchingItem = this.cartItems.find(cartItem => productId === cartItem.productId);

    if (matchingItem) {
      matchingItem.quantity = quantity;
      this.saveToStorage();

    } else {
      console.error(`Product with ID ${productId} not found in this.cartItems.`);
    }
  }
}

// const cart = new Cart('cart-oop');
// const businessCart = new Cart('cart-business');


// cart.addToCart('bc2fc1b4-91f7-4b3a-9e0a-0e4a9c02d917', 6);

// console.log(cart);
// console.log(businessCart);

// console.log(businessCart instanceof Cart); // true 
