import { formatCurrency } from '../../scripts/utils/money.js';

//create a test suite
describe('test suite: formatCurrency', () => {
  //create a test
  it('converts 100.0 to ₹100.00', () => {
    //compare values (give objects, have many methods)
    expect(formatCurrency(100.0)).toEqual('₹100.00');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('₹0.00');
  });

  it('works with negative numbers', () => {
    expect(formatCurrency(-100.0)).toBe('₹-100.00');
  });

  it('round up to the nearest two decimal places', () => {
    expect(formatCurrency(100.159)).toEqual('₹100.16');
  });
});