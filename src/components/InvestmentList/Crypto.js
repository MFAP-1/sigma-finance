import React from "react";
import "./Crypto.css";

const Crypto = (props) => {
  return (
    <div className="horizontal-div">
      
        <img src={props.image} alt="cryptoLogo" />

        <p className="coin-name">
          <b>{props.name}</b>
        </p>
        <p className="coin-symbol">
          <b>{props.symbol}</b>
        </p>
    
     
        <p className="price-div">
          <b> ${props.price}</b>
        </p>
      
        <p className = "marketCapRank-div">
          <b>Mkt Cap Rank: {props.marketcaprank}</b>
        </p>
        <p className = "marketCap-div">
          <b>Mkt Cap: ${props.marketcap.toLocaleString()}</b>
        </p>
        {props.priceChange < 0 ? (
          <p className="red">
            <b>{props.priceChange.toFixed(2)}</b>%
          </p>
        ) : (
          <p className="green">
            <b>{props.priceChange.toFixed(2)}</b>%
          </p>
          
        )}
        
     
    </div>
  );
};

export default Crypto;
