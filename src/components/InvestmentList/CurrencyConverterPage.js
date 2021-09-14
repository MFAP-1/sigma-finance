import React from "react";
import axios from "axios";
import ipcaCalculator2 from "../../scripts/ipcaCalculator2";
import SelicCalculator from "../../scripts/SelicCalculator";



class CurrencyConverterPage extends React.Component {
  constructor() {
    super();
    this.state = {
      
      currenciesInformation: {},
      currenciesList:[],
      fromCurrency: "USD",
      toCurrency:"BRL",
      amount: 0,
      finalResult: 0,
  
    };
  }


  getCurrencyData = async () => {
    const url =
      "http://api.exchangeratesapi.io/v1/latest?access_key=ac8ab16193cf913bd7bbf4e56ef3f6c2";

    const response = await axios.get(url);
    const currenciesObj = {...response.data["rates"]}
    const currenciesArr = [...Object.keys(currenciesObj)]
 
    
    this.setState({
        currenciesInformation: {...currenciesObj},
        currenciesList: [...currenciesArr],
 
    });

    // console.log(this.state.currenciesInformation);
 
  };
 
  Calculate = () => {
      const amount = this.state.amount
      const m = this.state.currenciesInformation[this.state.fromCurrency]  //exchange rate do fromCurency baseado no EUR
      const n = this.state.currenciesInformation[this.state.toCurrency]  //exchange rate do toCurency baseado no EUR
      // (n/m) exchange rate das duas moedas
      const result = amount*(n/m)
      this.setState({
          finalResult: result
      })
        
 }

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

handSubmit = (event) =>{
 this.Calculate()
}
  

  render() {
    return (
      <div>
        <h1>Currency Converter</h1>
        <div>
        <input  
            value ={this.state.amount} 
            type="number" 
            className="currencyConverter-input"
            onChange={this.handleAmount} />
        <select  
            name ="fromCurrency" 
            className="select-currency" 
            value={this.state.fromCurrency} 
            onChange={this.handleCurrency}>
        {this.state.currenciesList.map ((currency) => {
           return (<option key = {currency} value={currency}>{currency}</option>   )     
            })}
              </select>
      </div>
       <div>
        <h1>{this.state.finalResult} {this.state.toCurrency}</h1>
                
        <select 
            className="select-currency" 
            name ="toCurrency" 
            value={this.state.toCurrency} 
            onChange={this.handleCurrency} >
            {this.state.currenciesList.map ((currency) => {
           return (<option key = {currency} value={currency}>{currency}</option>   )     
            })}
      
        </select>

        <div>
        <button onClick= {this.handSubmit}>Convert</button>
  
        <div></div>
      </div>
      </div>

 </div>
    );
  }
}

export default CurrencyConverterPage;
