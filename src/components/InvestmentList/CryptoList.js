import React from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "./InvestmentList.css";

class CryptoList extends React.Component {
  constructor() {
    super();
    this.state = {
        coins:[]
    
    };
  }

  getChartData = async () => {
    
     
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false%27`

    const response = await axios.get(url);

    console.log(Object.values(response.data[0]))
    this.transformData(response.data);
    
  };

  transformData = (data) => {
    const cryptoList = [];
    
    for (let key in data) {
       cryptoList.push(data[key]["id"]);
    }
   
    this.setState({
      coins: [...cryptoList],
     
    });
  };


  componentDidMount = async () => {
    try {
      await this.getChartData();

      } catch (err) {
      console.error(err);
    }
  };


  render() {
      return (
         <div>
             <h1> Coins </h1>
             <ul>
             {this.state.coins.map((coin) => {
                 return <li> {coin} </li>
             })}
             
             </ul>
             
             </div>
      )
  }

  
}

export default CryptoList;
