import luhn from "./luhn.js";

export function createCardValidator({ leadingDigits, totalDigits }) {
  const cardValidator = Object.create(createCardValidator.prototype);

  const leadingNumbers = cloneNumArray(leadingDigits);
  Object.defineProperty(cardValidator, "leadingNumbers", {
    get() {
      return leadingNumbers;
    },
  });

  const validLengths = cloneNumArray(totalDigits);
  Object.defineProperty(cardValidator, "validLengths", {
    get() {
      return validLengths;
    },
  });

  const leadingNumbersRegex = new RegExp(
    leadingNumbers.reduce(
      (regexPattern, currentNumber, index) =>
        index === 0 ? `^${currentNumber}` : `${regexPattern}|^${currentNumber}`,
      ""
    )
  );
  Object.defineProperty(cardValidator, "leadingNumbersRegex", {
    get() {
      return leadingNumbersRegex;
    },
  });

  return cardValidator;
}

// Methods
createCardValidator.prototype.hasValidLength = function (cardNumber) {
  if (typeof cardNumber !== "number") {
    throw new Error("Invalid 'cardNumber' argument type.");
  }

  return this.validLengths.some(
    (item) => cardNumber.toString().length === item
  );
};

createCardValidator.prototype.startsWithValidNumber = function (cardNumber) {
  if (typeof cardNumber !== "number") {
    throw new Error("Invalid 'cardNumber' argument type.");
  }

  return this.leadingNumbersRegex.test(cardNumber.toString());
};

createCardValidator.prototype.isLuhnValid = function (cardNumber) {
  if (typeof cardNumber !== "number") {
    throw new Error("Invalid 'cardNumber' argument type.");
  }

  return luhn(cardNumber) === 0;
};

createCardValidator.prototype.isValid = function (cardNumber) {
  return (
    this.hasValidLength(cardNumber) &&
    this.startsWithValidNumber(cardNumber) &&
    this.isLuhnValid(cardNumber)
  );
};

// Helpers
function cloneNumArray(numArray) {
  if (
    Array.isArray(numArray) &&
    numArray.every((item) => typeof item === "number")
  ) {
    return [...numArray];
  } else if (typeof numArray === "number") {
    return [numArray];
  } else {
    throw new Error(
      "Invalid `numArray` argument type. Array of numbers or number is expected"
    );
  }
}
