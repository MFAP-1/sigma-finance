import React from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "./InvestmentList.css";
import Crypto from "./Crypto";

class CryptoList extends React.Component {
  constructor() {
    super();
    this.state = {
      coins: [],
      search: "",
    };
  }

  getListData = async () => {
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`;

    const response = await axios.get(url);
    const coinsObj = [...response.data];
    this.setState({
      coins: [...coinsObj],
    });

    console.log(this.state.coins);

  };

  componentDidMount = async () => {
    try {
      await this.getListData();
    } catch (err) {
      console.error(err);
    }
  };

    handleChange = (event) => {
      this.setState({
          search: event.target.value,
        });
    }

    filteredCoins = (e) => {
        e.preventDefault()
        console.log(this.state.search)
       let filteredCoinArr =  this.state.coins.filter((coin) =>{
          return   coin.name.toLowerCase().includes(this.state.search.toLowerCase())
        })
        this.setState({
           coins: [...filteredCoinArr]
          });
         
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.search !== this.state.search && this.state.search.length===0) {
          this.getListData();
        }
      };


    render() {
    
    return (
      <div>
        <div>
          <h1 >Search a Crypto</h1>
          <form >
          <button  onClick={this.filteredCoins}>
            Search
          </button>
            <input
              type="text"
              placeholder="Find a Crypto"
              onChange={this.handleChange}
            />
          </form>
        </div>
        {this.state.coins.map((coin) => {
          return (
            <Crypto
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              volume={coin.market_cap}
              price={coin.current_price}
            />
          );
        })}
      </div>
    );
  }
}

export default CryptoList;

