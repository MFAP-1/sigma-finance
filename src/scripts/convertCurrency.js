import axios from "axios";


const getExchange = async (currency1, currency2, amount) => {
 try {
    let  url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${currency1}&to_currency=${currency2}&apikey=R2P4F9RG0EKKWZEU`
        
    const response = await axios.get(url);
    let exchangeRate = response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
    let convertedAmount = exchangeRate*amount
    console.log(convertedAmount)
        
    } catch (err) {
      console.error(err);
    }
}
  


export default getExchange;