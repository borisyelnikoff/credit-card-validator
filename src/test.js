// Full name with extension necessary for Node ESM module loader
import luhn from "./luhn.js";
import cardsData from "./cardsData.json";

// luhn algorithm tests
function verify(input, goal) {
  if (input === goal) {
    console.log("Gratulacje!");
  } else {
    console.log(`Niestety, oczekiwano - ${goal}, otrzymano - ${input}`);
  }
}

const { testNumbers } = cardsData;
const testData = [
  ...testNumbers.mastercard,
  ...testNumbers.visa,
  ...testNumbers.americanExpress,
];
testData.forEach((item) => verify(luhn(item), 0));

// Failing tests
const invalidNumbers = [
  testNumbers.mastercard[0] + 3,
  testNumbers.visa[1] * 2,
  testNumbers.americanExpress[0] - 10538234,
];

invalidNumbers.forEach((item) => verify(luhn(item), 0));
