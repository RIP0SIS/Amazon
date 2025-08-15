# Amazon Clone – E-Commerce Frontend

A responsive e-commerce frontend inspired by Amazon, built with HTML, CSS, and JavaScript. Features a fully functional shopping cart, checkout page, and interactive product listings with unit and integration tests using Jasmine.

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
- [License](#license)

---

## Demo
![alt text](image.png)

---

## Features
- Fully functional cart system
- Add, remove, and update product quantities
- Persistent storage using `localStorage`
- Checkout page with order summary and payment summary
- Dynamic delivery option selection
- Responsive product grid layout
- Sticky header with hide-on-scroll effect
- Product price formatting and ratings display
- Unit and integration tests for key features

---

## Folder Structure
amazon-clone/
│
├─ data/
│ ├─ cart.js
│ ├─ deliveryOptions.js
│ ├─ products.js
│ ├─ cartTest.js
│ └─ productTest.js
│
├─ scripts/
│ ├─ checkout/
│ │ ├─ orderSummary.js
│ │ └─ paymentSummary.js
│ └─ utils/
│ └─ money.js
│
├─ styles/
│ ├─ main.css
│ ├─ checkout.css
│ └─ header.css
│
├─ tests/
│ └─ test.html  ← Jasmine Spec Runner
│
├─ checkout.html
└─ index.html 

---

## Technologies Used
- **HTML5 & CSS3** – markup and styling, including responsive design and CSS Grid
- **JavaScript (ES6 Modules)** – interactive features, cart functionality, and utilities
- **Jasmine 5** – unit and integration testing

---

## Setup & Installation
**1. Clone the repository**
```bash
git clone https://github.com/yourusername/amazon-clone.git
cd amazon-clone


**2. Open the Project

- **Product listing page:** Open `index.html` in your browser.  
- **Checkout page:** Open `checkout.html` in your browser.


**3. Run Tests

- Open `spec-runner.html` in your browser to view **Jasmine** test results.

---

## Testing

### Unit Tests
- **Cart system:** `addToCart`, `removeFromCart`, `updateDeliveryOption`
- **Products class:** properties, price formatting, and rating stars
- **Money utility:** formats numbers as currency

### Integration Tests
- **Order summary:** renders products from cart correctly
- **Delivery option updates:** updates both UI and cart object
- **Payment summary:** calculates total price dynamically

---

## Functionality Details

### Sticky Header with Scroll

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

