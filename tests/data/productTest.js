import { products, Products } from '../../data/products.js';

describe('test suite: Products class', () => {
  it('has correct properties and methods', () => {
    const productDetails = {
      id: "bc2fc1b4-91f7-4b3a-9e0a-0e4a9c02d917",
      image: "images/products/Lifelong-Fitpro.jpg",
      name: "Lifelong FitPro LLTM09",
      rating: {
        stars: 4.0,
        count: 6699,
      },
      price: 14999,
      keywords: [
        "fitness",
        "treadmill",
        "exercise",
      ]
    };

    const product = new Products(productDetails);

    // Properties
    expect(product.id).toEqual("bc2fc1b4-91f7-4b3a-9e0a-0e4a9c02d917");
    expect(product.image).toEqual("images/products/Lifelong-Fitpro.jpg");
    expect(product.name).toEqual("Lifelong FitPro LLTM09");
    expect(product.rating).toEqual({ stars: 4.0, count: 6699 });
    expect(product.price).toEqual(14999);
    expect(product.keywords).toEqual(["fitness","treadmill", "exercise",]);

    // Methods
    expect(product.getStarsUrl()).toEqual("images/ratings/rating-40.png");
    expect(product.getPrice()).toEqual("₹14,999.00");
    expect(product.extraInfoHTML()).toEqual('');
  });
});
