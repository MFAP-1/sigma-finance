import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import axios from "axios";


class CurrencyConverterPage extends React.Component {
  constructor() {
    super();
    this.state = {
      currenciesInformation: {},
      currenciesList:[],
      fromCurrency: "USD",
      toCurrency:"BRL",

    };
  }

  getCurrencyData = async () => {
    const url =
      "http://api.exchangeratesapi.io/v1/latest?access_key=ac8ab16193cf913bd7bbf4e56ef3f6c2";

    const response = await axios.get(url);
    const currenciesObj = {...response.data}
    const currenciesArr = [...Object.keys(response.data["rates"])]
    
    this.setState({
        currenciesInformation: {...currenciesObj},
        currenciesList: [...currenciesArr]
      
    });

    // console.log(this.state.currenciesInformation);
     console.log(this.state.fromCurrency)
  };

  componentDidMount = async () => {
    try {
      await this.getCurrencyData();
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div>
        <h1>Currency Converter</h1>
        <CurrencyConverter 
            currenciesList = {this.state.currenciesList}
            currentCurrency ={this.state.fromCurrency}/>
        <div>=</div>
        <CurrencyConverter 
            currenciesList = {this.state.currenciesList}
            currentCurrency ={this.state.toCurrency}/>
      </div>
    );
  }
}

export default CurrencyConverterPage;
