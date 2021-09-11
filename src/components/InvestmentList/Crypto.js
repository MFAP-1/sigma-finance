import React from "react";
import "./Crypto.css";


const Crypto = (props) => {
    return (
      
        <div className = "coin-container">
            <div className = "crypto-strip">
                <div className = "divImgNameSymbol">
                    <img src = {props.image} alt="cryptoLogo"/>
                    <h1>{props.name}</h1>
                    <p className = "coin-symbol">{props.symbol}</p>
                </div>
                <div className ="coin-data">
                    <p className ="coin-price">${props.price}</p>
                    <p className ="coin-volume">${props.marketcap.toLocaleString()}</p>
                    <p className ="coin-price">${props.price}</p>
                    <p className ="coin-price">{props.priceChange}%</p>
               </div>
            </div>
        </div>
    )

}



export default Crypto;
