import React from "react";
import "./InvestmentList.css";


const Crypto = (props) => {
    return (
      
        <div >
            <div >
                <div >
                    <img src = {props.image} alt="cryptoLogo"/>
                    <h1>{props.name}</h1>
                    <p >{props.symbol}</p>
                </div>
                <div >
                    <p >${props.price}</p>
                    <p >${props.volume.toLocaleString()}</p>
                </div>
            </div>

<h1>teste</h1>
        </div>
    )

}



export default Crypto;


