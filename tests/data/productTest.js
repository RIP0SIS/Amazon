import { products, Products } from '../../data/products.js';

describe('test suite: Products class', () => {
  it('has correct properties and methods', () => {
    const productDetails = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    };

    const product = new Products(productDetails);

    // Check product properties
    expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(product.image).toEqual("images/products/athletic-cotton-socks-6-pairs.jpg");
    expect(product.name).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
    expect(product.rating).toEqual({ stars: 4.5, count: 87 });
    expect(product.priceCents).toEqual(1090);
    expect(product.keywords).toEqual(["socks",
        "sports",
        "apparel"]);

    // Check product methods
    expect(product.getStarsUrl()).toEqual("images/ratings/rating-45.png");
    expect(product.getPrice()).toEqual("₹1,090.00");
    expect(product.extraInfoHTML()).toEqual('');
  });
});
