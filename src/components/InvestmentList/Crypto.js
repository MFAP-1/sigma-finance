import React from "react";
import "./Crypto.css";

const Crypto = (props) => {
  return (
    <div className="crypto-strip">
      <div className="divImgNameSymbol">
        <img src={props.image} alt="cryptoLogo" />

        <p>
          <b>{props.name}</b>
        </p>
        <p className="coin-symbol">
          <b>{props.symbol}</b>
        </p>
      </div>
      <div className="coin-data">
        <p className="coin-price">
          <b> ${props.price}</b>
        </p>
        <p>
          <b>Mkt Cap Rank: {props.marketcaprank}</b>
        </p>
        <p>
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
    </div>
  );
};

export default Crypto;
