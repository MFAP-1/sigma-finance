import axios from "axios";

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  try {
    let url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=R2P4F9RG0EKKWZEU`;

    const response = await axios.get(url);
    const exchangeRate = response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
    const convertedAmount = exchangeRate * amount;
    console.log(convertedAmount);
    return convertedAmount
    
  } catch (err) {
    console.error(err);
  }
};

export default convertCurrency