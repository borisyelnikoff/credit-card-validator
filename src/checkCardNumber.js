import createCardValidator from "./cardValidator.js";
import { cardTypes } from "./cardsData.js";

export default function checkCardNumber(cardNumber) {
  if (typeof cardNumber !== "number") {
    throw new Error("Invalid argument. Number is expected.");
  }

  let cardVendor = "Invalid";
  Object.entries(cardTypes).some(([cardName, cardAttr]) => {
    const cardValidator = createCardValidator(cardAttr);
    if (cardValidator.isValid(cardNumber)) {
      cardVendor = cardName.replace(/^[a-z]/, cardName[0].toUpperCase());
      return true;
    }

    return false;
  });

  return cardVendor;
}
