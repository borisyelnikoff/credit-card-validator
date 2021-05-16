import luhn from "./luhn.js"; // Extension necessary for Node ESM module loader
import * as cardsData from "./cardsData.js";
import createCardValidator from "./cardValidator.js";
import checkCardNumber from "./checkCardNumber.js";

// Tests
function verify(input, goal) {
  if (input === goal) {
    console.log("Gratulacje!");
  } else {
    console.log(`Niestety, oczekiwano - ${goal}, otrzymano - ${input}`);
  }
}

const { testNumbers } = cardsData;

// Luhn algorithm tests
let testData = [
  ...testNumbers.mastercard,
  ...testNumbers.visa,
  ...testNumbers.americanExpress,
];

const invalidNumbers = [
  testNumbers.mastercard[0] + 3,
  testNumbers.visa[1] * 2,
  testNumbers.americanExpress[0] - 10538234,
];
console.log("Luhn algorithm tests:");
testData.forEach((cardNumber) => verify(luhn(cardNumber), 0));

const invalidNumsAssertions = [5, 1, 2];
invalidNumbers.forEach((cardNumber, index) =>
  verify(luhn(cardNumber), invalidNumsAssertions[index])
);
console.log("\n");

// Card validator tests
const { cardTypes } = cardsData;
console.log("Card validator tests:");
let assertions = [false, false, false, true, true];
testData = testNumbers.mastercard;

// Mastercard
const mastercardValidator = createCardValidator(cardTypes.mastercard);
console.log("Mastercard tests:");
testData.forEach((cardNumber, index) =>
  verify(mastercardValidator.isValid(cardNumber), assertions[index])
);

// Visa
assertions = [true, true, true];
testData = testNumbers.visa;

const visaValidator = createCardValidator(cardTypes.visa);
console.log("\nVisa tests:");
testData.forEach((cardNumber, index) =>
  verify(visaValidator.isValid(cardNumber), assertions[index])
);

// American Express
assertions = [true, true, true];
testData = testNumbers.americanExpress;

const americanExpressValidator = createCardValidator(cardTypes.americanExpress);
console.log("\nAmerican Express tests:");
testData.forEach((cardNumber, index) =>
  verify(americanExpressValidator.isValid(cardNumber), assertions[index])
);

// Check card number tests
console.log("\ncheckCardNumber tests:");
testData = [
  testNumbers.mastercard[0],
  testNumbers.mastercard[3],
  testNumbers.visa[0],
  testNumbers.americanExpress[0],
];
assertions = ["Invalid", "Mastercard", "Visa", "AmericanExpress"];
testData.forEach((cardNumber, index) =>
  verify(checkCardNumber(cardNumber), assertions[index])
);
