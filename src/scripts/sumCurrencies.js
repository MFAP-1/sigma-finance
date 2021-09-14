import convertCurrency from "./convertCurrency";

// function sumCurrencies(valueInUSD, valueInBRL, valueInEUR, targetCurrency) {
//   let totalSum = 0;
//   try {
//     switch (targetCurrency) {
//       case "USD":
//         totalSum = valueInUSD + valueInBRL / 5 + valueInEUR * 1.2;
//         break;
//       case "BRL":
//         totalSum = valueInBRL + valueInUSD * 5 + valueInEUR * 6;
//         break;
//       case "EUR":
//         totalSum = valueInEUR + valueInUSD * 0.8 + valueInBRL / 6;
//         break;
//       default:
//         totalSum = -1;
//     }
//   } catch (err) {
//     console.error(err);
//   }
//   return totalSum;
// }

// export default sumCurrencies;

async function sumCurrencies(
  valueInUSD,
  valueInBRL,
  valueInEUR,
  targetCurrency
) {
  let totalSum = 0;
  try {
    switch (targetCurrency) {
      case "USD":
        totalSum =
          valueInUSD +
          (await convertCurrency("BRL", "USD", valueInBRL)) +
          (await convertCurrency("EUR", "USD", valueInEUR));
        break;
      case "BRL":
        totalSum =
          valueInBRL +
          (await convertCurrency("USD", "BRL", valueInUSD)) +
          (await convertCurrency("EUR", "BRL", valueInEUR));
        break;
      case "EUR":
        totalSum =
          valueInEUR +
          (await convertCurrency("USD", "EUR", valueInUSD)) +
          (await convertCurrency("BRL", "EUR", valueInBRL));
        break;
      default:
        totalSum = -1;
    }
  } catch (err) {
    console.error(err);
  }
  return totalSum;
}

export default sumCurrencies;
