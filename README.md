# Amazon Clone – E-Commerce Frontend

A responsive e-commerce frontend inspired by Amazon, built with HTML, CSS, and JavaScript. This project features a fully functional shopping cart, a dynamic checkout page, and interactive product listings with a comprehensive suite of unit and integration tests using Jasmine.

---

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Setup & Installation](#setup--installation)
- [Testing](#testing)
- [Functionality Details](#functionality-details)
- [Responsive Design](#responsive-design)

---

## Demo

![A screenshot of the Amazon clone project interface](image.png)

---

## Features

* **Fully Functional Cart System**
    Allows users to add, remove, and update product quantities in the shopping cart.

* **Persistent Storage**
    Uses `localStorage` to save the cart's state, so items are not lost between sessions.

* **Dynamic Checkout Page**
    Features a detailed order summary and a payment summary that updates in real-time.

* **Delivery Option Selection**
    Users can choose different delivery dates for each item in their cart, and the costs update accordingly.

* **Responsive Product Grid**
    The product layout is built with CSS Grid, adapting smoothly from multi-column layouts on desktops to a single column on mobile devices.

* **Sticky Header with Scroll Effect**
    The header remains visible at the top but hides on scroll-down to maximize screen space for content, reappearing on scroll-up.

* **Comprehensive Testing**
    Includes a full suite of unit and integration tests written with the Jasmine framework to ensure code reliability.

---


## Folder Structure
```
amazon-clone/
│
├─ data/
│   ├─ cart.js
│   ├─ deliveryOptions.js
│   ├─ products.js
│   ├─ cartTest.js
│   └─ productTest.js
│
├─ scripts/
│   ├─ checkout/
│   │   ├─ orderSummary.js
│   │   └─ paymentSummary.js
│   └─ utils/
│       └─ money.js
│
├─ styles/
│   ├─ main.css
│   ├─ checkout.css
│   └─ header.css
│
├─ tests/
│   └─ test.html  ← Jasmine Spec Runner
│
├─ checkout.html
└─ index.html
```


---

## Technologies Used
- **HTML5 & CSS3** – markup and styling, including responsive design and CSS Grid
- **JavaScript (ES6 Modules)** – interactive features, cart functionality, and utilities
- **Jasmine 5** – unit and integration testing

---

## Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/amazon-clone.git](https://github.com/yourusername/amazon-clone.git)
    cd amazon-clone
    ```

2.  **Open the Project**
    No build step is required. Simply open the HTML files directly in your web browser.
    * **Product listing page:** Open `index.html`.
    * **Checkout page:** Open `checkout.html`.

3.  **Run Tests**
    * Open `spec-runner.html` in your browser to view the **Jasmine** test results.

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

