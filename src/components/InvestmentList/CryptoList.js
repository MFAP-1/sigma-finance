import React from "react";
import axios from "axios";
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
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

    const response = await axios.get(url);
    const coinsObj = [...response.data];
    this.setState({
      coins: [...coinsObj],
    });

    // console.log(this.state.coins);
  };

  componentDidMount = async () => {
    try {
      await this.getListData();
    } catch (err) {
      console.error(err);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.search !== this.state.search &&
      this.state.search.length === 0
    ) {
      this.getListData();
    }
  };

  handleChange = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.search);
    let filteredCoinArr = this.state.coins.filter((coin) => {
      return coin.name.toLowerCase().includes(this.state.search.toLowerCase());
    });
    if (filteredCoinArr.length !== 0) {
      this.setState({
        coins: [...filteredCoinArr],
      });
    }
  };

  render() {
    return (
      <div className="coin-app">
        <div className="coin-search">
          <h1 className="cryptocurrency-title">Cryptocurrencies</h1>
          <form className="crypto-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Find a crypto"
              className="search-input"
              onChange={this.handleChange}
            />
            <button className="button-form">Search</button>
          </form>
        </div>
        {this.state.coins.map((coin) => {
          return (
            <Crypto
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              marketcaprank={coin.market_cap_rank}
            />
          );
        })}
      </div>
    );
  }
}

export default CryptoList;
