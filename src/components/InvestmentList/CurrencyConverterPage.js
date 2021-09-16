import React from "react";
import axios from "axios";

import formatMoney from "../../scripts/formatMoney";

import "./CurrencyConverterPage.css";

class CurrencyConverterPage extends React.Component {
  constructor() {
    super();
    this.state = {
      currenciesInformation: {},
      currenciesList: [],
      fromCurrency: "USD",
      toCurrency: "BRL",
      amount: 0,
      finalResult: 0,
    };
  }

  //https://v6.exchangerate-api.com/v6/0643403684aee3640b113f6c/latest/EUR

  getCurrencyData = async () => {
    const url =
      "https://api.exchangeratesapi.io/v1/latest?access_key=ac8ab16193cf913bd7bbf4e56ef3f6c2";

    const response = await axios.get(url);
    const currenciesObj = { ...response.data["rates"] };
    const currenciesArr = [...Object.keys(currenciesObj)];

    this.setState({
      currenciesInformation: { ...currenciesObj },
      currenciesList: [...currenciesArr],
    });

    // console.log(this.state.currenciesInformation);
  };

  Calculate = () => {
    const amount = this.state.amount;
    const m = this.state.currenciesInformation[this.state.fromCurrency]; //exchange rate do fromCurency baseado no EUR
    const n = this.state.currenciesInformation[this.state.toCurrency]; //exchange rate do toCurency baseado no EUR
    // (n/m) exchange rate das duas moedas
    const result = amount * (n / m);
    this.setState({
      finalResult: result,
    });
  };

  componentDidMount = async () => {
    try {
      await this.getCurrencyData();
    } catch (err) {
      console.error(err);
    }
  };

  handleCurrency = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAmount = (event) => {
    this.setState({ amount: event.target.value });
  };

  handSubmit = (event) => {
    event.preventDefault();
    this.Calculate();
  };

  render() {
    return (
      <div className="converter-form-box">
        <div>
          <h2>Currency Converter</h2>
          <p>
            <br />
            Input the value and the currency that you want to convert.
            <br />
            Then, input the target currency.
          </p>
        </div>
        <form className="converter-form" onSubmit={this.handSubmit}>
          <div className="converter-form-couple-div">
            <input
              value={this.state.amount}
              type="number"
              min="0"
              step="0.01"
              className="currencyConverter-input"
              onChange={this.handleAmount}
              required
            />
            <select
              className="select-currency"
              name="fromCurrency"
              value={this.state.fromCurrency}
              onChange={this.handleCurrency}
            >
              {this.state.currenciesList.map((currency) => {
                return (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="converter-form-couple-div">
            <h2>
              {formatMoney(this.state.finalResult, this.state.toCurrency)}{" "}
              {this.state.toCurrency}
            </h2>

            <select
              className="select-currency"
              name="toCurrency"
              value={this.state.toCurrency}
              onChange={this.handleCurrency}
            >
              {this.state.currenciesList.map((currency) => {
                return (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                );
              })}
            </select>
          </div>
          <button>
            Convert: {this.state.fromCurrency} to {this.state.toCurrency}
          </button>
        </form>
      </div>
    );
  }
}

export default CurrencyConverterPage;
