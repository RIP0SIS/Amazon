//Use PascalCase for things that generate objects
function Cart(localStorageKey) { //func to generate a object
  const cart = {
  cartItems: undefined,

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || []; //if null, use empty array to use .find , .reduce methods
  },

  totalQuantity() {
    return this.cartItems.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.quantity; 
    }, 0);
  },

  saveToStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
  },

  timeoutIds : {},

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
  },
  
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
  },

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
  },

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
  },

  updateQuantity(productId, quantity) {
    let matchingItem = this.cartItems.find(cartItem => productId === cartItem.productId);

    if (matchingItem) {
      matchingItem.quantity = quantity;
      this.saveToStorage();

    } else {
      console.error(`Product with ID ${productId} not found in this.cartItems.`);
    }
  }
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
// Amazon has a feature , business cart, which is a separate cart for business customers.
businessCart.loadFromStorage();

cart.addToCart('bc2fc1b4-91f7-4b3a-9e0a-0e4a9c02d917', 6);

console.log(cart);
console.log(businessCart);
