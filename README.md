Amazon Clone – E-Commerce Frontend
A responsive e-commerce frontend inspired by Amazon, built with HTML, CSS, and JavaScript. Features a fully functional shopping cart, checkout page, and interactive product listings with unit and integration tests using Jasmine.

Table of Contents
Demo

Features

Folder Structure

Technologies Used

Setup & Installation

Testing

Functionality Details

Responsive Design

License

Demo
A quick look at the project's main page.

Features
Fully functional cart system: Add, remove, and update product quantities.

Persistent Storage: Cart data is saved to localStorage, so it persists across sessions.

Dynamic Checkout Page: An order summary and payment summary that update in real-time.

Delivery Options: Users can select different delivery dates for each item.

Responsive Product Grid: The layout adapts smoothly to different screen sizes.

Interactive Header: The header is sticky and hides on scroll for a better user experience.

Clean UI: Product prices are formatted, and ratings are displayed as star icons.

Tested Code: Includes unit and integration tests for key features using the Jasmine framework.

Folder Structure
amazon-clone/
│
├── data/
│   ├── cart.js
│   ├── deliveryOptions.js
│   ├── products.js
│   ├── cartTest.js
│   └── productTest.js
│
├── scripts/
│   ├── checkout/
│   │   ├── orderSummary.js
│   │   └── paymentSummary.js
│   └── utils/
│       └── money.js
│
├── styles/
│   ├── main.css
│   ├── checkout.css
│   └── header.css
│
├── tests/
│   └── test.html          ← Jasmine Spec Runner
│
├── checkout.html
└── index.html
Technologies Used
HTML5 & CSS3: For structuring and styling the web pages, including modern features like CSS Grid for responsive layouts.

JavaScript (ES6 Modules): For all interactive features, cart functionality, and DOM manipulation.

Jasmine 5: A behavior-driven development framework for testing JavaScript code.

Setup & Installation
1. Clone the repository

Bash

git clone https://github.com/yourusername/amazon-clone.git
cd amazon-clone
2. Open the Project

Product listing page: Open index.html in your browser.

Checkout page: Open checkout.html in your browser.

3. Run Tests

Open tests/test.html in your browser to view the Jasmine test results.

Testing
The project includes a comprehensive test suite to ensure reliability and maintainability.

Unit Tests
Cart System: Covers addToCart, removeFromCart, and updateDeliveryOption functions to ensure they modify the cart data correctly.

Products Class: Verifies that product properties, price formatting, and rating star generation work as expected.

Money Utility: Tests the formatCurrency function to ensure numbers are correctly converted to a currency string.

Integration Tests
Order Summary: Ensures that the summary section on the checkout page renders products from the cart correctly.

Delivery Option Updates: Verifies that changing a delivery option updates both the UI and the underlying cart object.

Payment Summary: Confirms that the payment summary dynamically calculates and displays the correct subtotal, taxes, and total price.

Functionality Details
Sticky Header with Scroll
The header is designed to hide when the user scrolls down and reappear when they scroll up, maximizing screen space for content.

JavaScript

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
Cart Features
Increment or decrement the quantity of a product directly from the cart.

Remove a product entirely from the cart.

Cart state is saved in localStorage, preserving it between page loads and browser sessions.

Checkout Page
Order Summary: Lists all products in the cart, along with their quantities and delivery options.

Payment Summary: Displays a breakdown of the subtotal, shipping fees, taxes, and the final total.

Dynamic Updates: Selecting different delivery options instantly updates the cart data and recalculates the payment summary.

Responsive Design
The application is fully responsive and optimized for a seamless experience on all devices.

Products Page: Uses CSS Grid's repeat() function and media queries to create a flexible grid that adjusts to different screen widths.

Checkout Page: The two-column grid layout collapses into a single column on smaller screens for better readability.

Header: The header logo and navigation elements adapt to mobile viewports.