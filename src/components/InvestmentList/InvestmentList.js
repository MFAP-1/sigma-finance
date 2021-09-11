import React from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "./InvestmentList.css";
import InvestmentSearchList from "./InvestmentSearchList";

const randomStockList = ["AAPL", "MSFT", "AMZN", "FB", "GOOG", "GOOGL", "TSLA", "NVIDIA", "PYPL", 
                      "ASML", "INTC", "NFLX", "ADBE", "CSCO", "PEP",   "XOM", "C", "PFE", "GE", 
                      "AIG", "WMT", "IBM", "BAC", "JNJ", "GS", "CVX", "PG",  "JPM",
                      "COP", "VALE3.SA", "ITUB4.SA", "PETR4.SA", "B3SA3.SA", "BBDC4.SA", "PETR3.SA",
                      "ABEV3.SA", "WEGE3.SA", "MGLU3.SA", "GNDI3.SA", "CASH3.SA"	]

class StockList extends React.Component {
     
    state = {

      chartValuesX: [],
      chartValuesY: [],
      companySymbol: "FB",
      outputsize: "compact",
      typeInformation: "TIME_SERIES_DAILY",
      isLoaded: null,
      // searchEndPoint:"",
      // bestMatches:[],
      // bestMatchesNames:[],
   
  }

  getRandomStocks = () => {
    let randomStocks = []
    for (let i = 0; i < 5; i++){
      randomStocks.push(randomStockList[Math.floor(Math.random()* randomStockList.length)])
    }
    console.log(randomStocks)
 }


  getChartData = async () => {
    const apiKey = "R2P4F9RG0EKKWZEU";

    let url = `https://www.alphavantage.co/query?function=${
      this.state.typeInformation
    }&symbol=${this.state.companySymbol.toUpperCase()}&outputsize=${
      this.state.outputsize
    }&apikey=${apiKey}`;
    console.log(url)

    //teste para não passar do limite de requisições
    // let url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo%22"

    const response = await axios.get(url);

    this.transformDataChart(response.data);
  };


  getCompanyData = async () => {
    let url2 = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=AAPL&apikey=demo%27"
    const response = await axios.get(url2);
  }

  transformDataChart = (data) => {
    const obj = { ...data["Time Series (Daily)"] };
    const chartXclone = [];
    const chartYclone = [];

    for (let key in obj) {
      chartXclone.push(key);
      chartYclone.push(obj[key]["4. close"]);
    }
    chartXclone.reverse();
    chartYclone.reverse();

    this.setState({
      chartValuesX: [...chartXclone],
      chartValuesY: [...chartYclone],
    });
  };

  componentDidMount = async () => {
    try {
      await this.getChartData();
      this.renderChart();
      this.getRandomStocks();

    } catch (err) {
      console.error(err);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.chartValuesY !== this.state.chartValuesY ) {
      this.renderChart();
    }
  };

  renderChart = () => {
    if (this.state.chartValuesX.length === 0) {
      return alert("Please write a valid stock");
    }

    if (this.state.isLoaded) {
      this.state.isLoaded.destroy();
    }

    const chart = new Chart(document.getElementById("myCanvas"), {
      type: "line",

      data: {
        labels: this.state.chartValuesX,
        datasets: [
          {
            label: this.state.companySymbol.toUpperCase(),
            data: this.state.chartValuesY,
            backgroundColor: "#03b1fc",
            borderColor: "black",
            fill: true,
            tension: 0.2,
            borderWidth: 1,
            pointRadius:1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: true,
            },
          },
        },
      },
    });

    this.setState({ isLoaded: chart });
  };

  handleInput = (event) => {
    this.setState({
      companySymbol: event.target.value,
    });
  };

  handleFind = () => {
    if (this.state.companySymbol === "") {
      alert("Please write a valid stock name");
    } else {
      this.getChartData();
    }
  };

///////////////////////////////////////////////////////


// getSearchData = async () => {
//   const apiKey = "R2P4F9RG0EKKWZEU";

//   let url2 = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.searchEndPoint}&apikey=${apiKey}`
//   console.log(url2)

//   const response2 = await axios.get(url2);
//   console.log(response2.data["bestMatches"])
//   const matches =[...response2.data["bestMatches"]]
//   this.setState ({
//     bestMatches: [...matches]
//   })

//   this.state.bestMatches.map((match)=> {
//     console.log(`${match["2. name"]}`)
//     return 1
  
//   })

// }

// renderSearch =() => {
//   this.state.bestMatches.map( match => {
//      <li>{match["2. name"]} </li>
//   })

// }


// handleInput2 = (event) => {
//   this.setState({
//     searchEndPoint: event.target.value,
//   });
// };

// handleFind2 = () => {
//   console.log(this.state.searchEndPoint)
//   if(this.state.searchEndPoint !== ""){
//      this.getSearchData();
//   }
// }

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (prevState.bestMatches !== this.state.bestMatches ) {
  //     this.render()
  //   }
  // };


////////////////////////////////////////////////////////////

  render() {


    return (
      <div className="container-graphic">
        <h1>Stocks</h1>

        <div className="searchBar">
          <input
            id="companySymbolInput"
            className="inputSearchBar"
            onChange={this.handleInput}
            value={this.state.companySymbol}
          />

          <button className="buttonSearchBar" onClick={this.handleFind}>
            Find
          </button>
        </div>


{/* Search Bar EndPoint */}

        <div className="searchBar2">
          <input
            id="companySymbolInput2"
            className="inputSearchBar2"
            onChange={this.handleInput2}
            // value={this.state.companySymbol}
          />
          <button className="buttonSearchBar2" onClick={this.handleFind2}>
            Find
          </button>
          {/* <div>{this.state.bestMatches.length === 0 ? this.state.bestMatches.length : this.state.bestMatches.length }</div> */}
          </div>


         <div className="canvasGraphic">
          <canvas id="myCanvas"> </canvas>
        </div>
      </div>
    );
  }
}

export default StockList;
