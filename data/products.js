import formatCurrency from "../scripts/utils/money.js";

// Retrieve a product by ID
export function getProduct(productId) {
  return products.find(product => product.id === productId);
}

// Base product class
export class Products {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;
  
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  // Returns star rating image path
  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  // Returns formatted price
  getPrice() {
    return `${formatCurrency(this.priceCents)}`;
  }

  // Can be overridden by subclasses
  extraInfoHTML() {
    return '';
  }
}

// Clothing product subclass
class Clothing extends Products {
  sizeChartLink;
  type;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
    this.type = productDetails.type;
  }

  // Adds clothing-specific info
  extraInfoHTML() {
    return `
      <a href="${this.sizeChartLink}" target="_blank" class="size-chart-link">
        Size Chart
      </a>
    `;
  }
}

// Product list (populated via backend fetch)
export let products = [];

// Load products using async/await with error handling
export async function loadProductsAsyncFetch() {
  try {
    const response = await fetch('https://supersimplebackend.dev/products');
    const productsData = await response.json();

    products = productsData.map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      }
      return new Products(productDetails);
    });

    console.log('Products loaded');
  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }
}
