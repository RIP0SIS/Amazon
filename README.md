# Amazon Clone – Full-Stack E-Commerce Project  

A responsive **Amazon-style e-commerce clone** built with **HTML, CSS, and JavaScript** for the frontend, and powered by a **live backend API** for product data, cart management, and order processing.  

This project demonstrates **frontend engineering skills** (UI, DOM manipulation, responsive design) combined with **backend integration** (fetch requests, JSON handling, and async workflows).  

---

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Backend Integration](#backend-integration)
- [Setup & Installation](#setup--installation)
- [Testing](#testing)
- [Functionality Details](#functionality-details)
- [Responsive Design](#responsive-design)

---

## Demo

![A screenshot of the Amazon clone project interface](image.png)

---

## Features

### 🔹 Frontend
- **Fully Functional Cart System** – add, remove, and update product quantities.  
- **Persistent Storage** – cart state saved in `localStorage`.  
- **Dynamic Checkout Page** – updates order and payment summary in real-time.  
- **Delivery Option Selection** – choose different delivery dates per item.  
- **Responsive Product Grid** – CSS Grid layout adapts for mobile & desktop.  
- **Sticky Header with Scroll Effect** – header hides/reappears smoothly.  
- **Comprehensive Testing** – Jasmine tests for reliability.  

### 🔹 Backend
- **Live Product Data** – products are fetched from the backend instead of hardcoding.  
- **Cart API** – mock cart data from backend (`/cart`).  
- **Orders API** – checkout triggers a `POST /orders` request with cart details.  
- **Greeting API** – demo API endpoints (`/greeting`) to test POST/GET requests.  
- **Image Hosting** – product and sample images come directly from the backend.  

---

## Folder Structure
```
.
├── backend/
├── data/
│   ├── cart-class.js
│   ├── cart-oop.js
│   ├── cart.js
│   ├── deliveryOptions.js
│   ├── orders.js
│   └─ products.js
├── images/
├── scripts/
│   ├── amazon/
│   ├── amazon-categories/
│   ├── checkout/
│   ├── order/
│   ├── utils/
│   ├── amazon.js
│   ├── checkout.js
│   ├── ordersDisplay.js
│   └─ tracking.js
├── styles/
├── tests/
├── amazon-appliances.html
├── amazon-clothing.html
├── amazon-shoes.html
├── amazon.html
├── checkout.html
├── image.png
├── index.html
├── orders.html
├── tracking.html
└─ README.md

```


---

## Technologies Used
- **Frontend:** HTML5, CSS3 (CSS Grid, media queries), Vanilla JavaScript (ES6 Modules)  
- **Backend API:** [SuperSimpleDev Backend](https://supersimplebackend.dev/documentation)  
- **Testing:** Jasmine 5  

---

## Backend Integration  

The project uses a **live backend API** hosted at:  https://supersimpledevbackend.dev

### Key Endpoints  

| Method | Endpoint            | Purpose |
|--------|---------------------|---------|
| `GET`  | `/products`         | Fetches all product data used in the grid |
| `GET`  | `/products/first`   | Returns the first product (demo use) |
| `GET`  | `/cart`             | Loads a mock cart |
| `POST` | `/orders`           | Creates a new order with the cart data |
| `GET`  | `/greeting`         | Returns a demo greeting |
| `POST` | `/greeting`         | Returns a personalized greeting |

### Example: 

Fetching Products
```javascript
export async function loadProductsAsyncFetch() {
  const response = await fetch('https://supersimpledevbackend.dev/products');
  const data = await response.json();
  products = data.map((product) => ({
    ...product,
    getStarsUrl() {
      return `images/ratings/rating-${product.rating.stars * 10}.png`;
    },
    getPrice() {
      return `₹${(product.priceCents / 100).toFixed(2)}`;
    },
    extraInfoHTML() {
      return "";
    }
  }));
}
```

Creating an Order
```javascript
async function createOrder(cart) {
  const response = await fetch('https://supersimpledevbackend.dev/orders', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart })
  });
  const order = await response.json();
  console.log('Order created:', order);
}

---

## Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/amazon-clone.git](https://github.com/yourusername/amazon-clone.git)
    cd amazon-clone
    ```

2.  **Open the Project**
    * Open `index.html`to view product listing (products load via backend).
    * Open `checkout.html`to simulate checkout and order placement.

3.  **Run Tests**
    * Open `test.html` in your browser to view the **Jasmine** test results.

---

## Testing

The project includes a robust test suite to ensure the reliability of key functionalities.

### Unit Tests
* **Cart System**: Covers core functions like `addToCart`, `removeFromCart`, and `updateDeliveryOption`.
* **Products Logic**: Verifies product properties, price formatting, and rating star generation.
* **Money Utility**: Ensures the currency formatting utility works as expected.

### Integration Tests
* **Order Summary**: Confirms that the checkout page correctly renders products from the cart data.
* **Delivery Option Updates**: Tests that changing a delivery option updates both the UI and the cart object correctly.
* **Payment Summary**: Verifies that the payment summary calculates and displays the total price dynamically.

---

## Functionality Details

### Sticky Header with Scroll
The header hides when the user scrolls down and reappears when scrolling up to provide a better viewing experience. This is achieved with a simple JavaScript event listener that tracks the scroll position.

```javascript
export function hideHeaderOnScroll() {
  let lastScrollTop = 0;
  const header = document.querySelector('.js-amazon-header');
  const secondHeader = document.querySelector('.js-amazon-second-header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop) {
      header.classList.add('header-hidden');
      secondHeader.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
      secondHeader.classList.remove('header-hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
}

hideHeaderOnScroll();
```

---

## Cart Features
- Increment/decrement quantity
- Remove product
- Persistent storage in `localStorage`

---

## Checkout Page
- **Order summary:** shows products, quantities, delivery options
- **Payment summary:** subtotal, taxes, total price
- **Dynamic updates:** selecting delivery options updates cart and totals

---

## Responsive Design
- **Products page:** responsive grid using `repeat()` and media queries
- **Checkout page:** grid layout adapts to smaller screens
- **Header:** hides on scroll and collapses logos on mobile

