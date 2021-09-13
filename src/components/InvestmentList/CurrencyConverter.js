import React from "react";



function CurrencyConverter(props) {

  return (
    <div className="container-currencyConverter">
      <div>
        <input type="number" className="currencyConverter-input" />
        <select className="select-currency" value={props.currentCurrency}>
            {props.currenciesList.map ((currency) => {
           return (<option key = {currency} value={currency}>{currency}</option>   )     
            })}
      
        </select>
      </div>
    </div>
  );
}

export default CurrencyConverter;


