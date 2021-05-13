function luhn(input) {
  if (typeof input !== "number") {
    throw new Error("Invalid argument. Number is required.");
  }

  const reversed = input.toString().split("").reverse();
  const evenByTwo = reversed
    .filter((_, index) => index % 2 !== 0)
    .map((item) => 2 * item);

  const twoDigitRegex = /\d{2}/;
  const evenByTwoSum = evenByTwo
    .map((item) =>
      twoDigitRegex.test(item) ? item.toString().split("") : item
    )
    .flat()
    .map((item) => Number.parseInt(item, 10))
    .reduce((sum, item) => sum + item, 0);

  const oddSum = reversed
    .filter((_, index) => index % 2 === 0)
    .map((item) => Number.parseInt(item, 10))
    .reduce((sum, item) => sum + item, 0);

  return (evenByTwoSum + oddSum) % 10;
}

export default luhn;
