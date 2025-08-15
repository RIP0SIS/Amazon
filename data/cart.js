/*
module : contains a variable inside a file so that it won't cause conflict with other files
Without it we can't same name variable in different files(prevent name conflict)
(don't need to worry about order of loading files)
(better way to organize code)

export : to make the variable available outside the file

import : to use the variable in another file

type="module" : let a file to import a variable from another file
*/
export let cart;

loadFromStorage(); //load cart from localStorage when the module is loaded

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || []; //if null, use empty array
}

/* Helpful during Development :
if (!cart || cart.length===0) {  //if null, ([] empty array is truthy)
  cart = [  //default cart items
    {
      productId: "bc2fc1b4-91f7-4b3a-9e0a-0e4a9c02d917",
      quantity: 1,
      deliveryOptions: '1'
    },
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptions: '2'
    }];
}
  */

export function totalQuantity() {
  return cart.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.quantity; 
  }, 0);
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

const timeoutIds = {};  //store timeout IDs for each product

//solve multiple clicks on add to cart button
function showAddedToCartMessage(productId) {
  const element = document.querySelector(`.js-added-to-cart-${productId}`);
  if (!element) return;  //handle null

  element.classList.add("active"); //can't run for null

  // Clear previous timeout if exists
  if (timeoutIds[productId]) {
    clearTimeout(timeoutIds[productId]);
  }

  // Set a new timeout to remove the class after 2 seconds
  timeoutIds[productId] = setTimeout(() => {
    element.classList.remove("active");
    delete timeoutIds[productId];  //prevent memory leak
  }, 2000);
} 

export function addToCart(productId, quantity = 1) {

  let matchingItem = cart.find(cartItem => productId === cartItem.productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptions: '1' //default delivery option
    });
  }
  saveToStorage();

  showAddedToCartMessage(productId);

  // Trigger custom event so UI updates
  window.dispatchEvent(new Event("cartUpdated"));
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart; //update global cart variable
  saveToStorage();

  window.dispatchEvent(new Event("cartUpdated"));
}

export function updateDeliveryOption(productId ,deliveryOptionId){
  /*
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  */
  const validIds = ['1', '2', '3'];

  if (!validIds.includes(deliveryOptionId)) {
    return false; // invalid option
  }

  let matchingItem = cart.find(cartItem => productId === cartItem.productId);
  
  if(matchingItem){
      matchingItem.deliveryOptions = deliveryOptionId;
    saveToStorage();
  }
  return true;
}


//Update quantity in the cart header
export function updateQuantity(productId, quantity) {
  let matchingItem = cart.find(cartItem => productId === cartItem.productId);

  if (matchingItem) {
    matchingItem.quantity = quantity;
    saveToStorage();

    // window.dispatchEvent(new Event("cartUpdated"));
  } else {
    console.error(`Product with ID ${productId} not found in cart.`);
  }
}