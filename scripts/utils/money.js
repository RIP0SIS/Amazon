/**
 * Formats a number as Indian Rupees currency.
 * Returns "₹0.00" for invalid or non-numeric input.
 */
export function formatCurrency(amount) {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "₹0.00";
  }

  return `₹${Number(amount.toFixed(2)).toLocaleString("en-IN", {
    minimumFractionDigits: 2
  })}`;
}

export default formatCurrency;
