export const cardTypes = {
  mastercard: {
    leadingDigits: [51, 52, 53, 54, 55],
    totalDigits: 16,
  },
  visa: {
    leadingDigits: 4,
    totalDigits: [13, 16],
  },
  americanExpress: {
    leadingDigits: [34, 37],
    totalDigits: 15,
  },
};

export const testNumbers = {
  mastercard: [
    2221000000000009, 2223000048400011, 2223016768739313, 5555555555554444,
    5105105105105100,
  ],
  visa: [4111111111111111, 4012888888881881, 4222222222222],
  americanExpress: [378282246310005, 371449635398431, 378734493671000],
};
