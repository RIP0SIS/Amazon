import {formatCurrency} from "../../scripts/utils/money.js";

if(formatCurrency(100.0) !== "₹100.00") {
  console.error('failed');
} else {
  console.log('passed');
}

//Test suite
//1st testCase
if(formatCurrency(0) !== "₹0.00") {
  console.error('failed');
} else {
  console.log('passed');
}
//2nd testCase
if(formatCurrency(2000.4) !== "₹2,000.40") {
  console.error('failed');
} else {
  console.log('passed');
}

/*
1. Create test suite
2. Create tests
3. Compare values and display result
*/