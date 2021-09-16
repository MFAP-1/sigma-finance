import React from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "./InvestmentList.css";

class StockList extends React.Component {
  state = {
    chartValuesX: [],
    chartValuesY: [],
    companySymbol: "FB",
    outputsize: "compact",
    typeInformation: "TIME_SERIES_DAILY",
    isLoaded: null,
    searchEndPoint: "",
    bestMatches: [],
    displaySearchbar: false,
    displayMessage: false,
  };

  getChartData = async () => {
    // const apiKey = "R2P4F9RG0EKKWZEU";

    // let url = `https://www.alphavantage.co/query?function=${
    //   this.state.typeInformation
    // }&symbol=${this.state.companySymbol.toUpperCase()}&outputsize=${
    //   this.state.outputsize
    // }&apikey=${apiKey}`;
    // console.log(url)

    //teste para não passar do limite de requisições
    let url =
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo%22";

    const response = await axios.get(url);

    this.transformDataChart(response.data);
  };

  // getCompanyData = async () => {
  //   let url2 = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=AAPL&apikey=demo%27"
  //   const response = await axios.get(url2);
  // }

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
    } catch (err) {
      console.error(err);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.chartValuesY !== this.state.chartValuesY) {
      this.renderChart();
    }
  };

  renderChart = () => {
    if (this.state.chartValuesX.length === 0) {
      return null; //alert("Couldn't find information about this stock at the moment. Please try again or search for another" );
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
            backgroundColor: "black",
            borderColor: "black",
            fill: true,
            tension: 0.2,
            borderWidth: 1,
            pointRadius: 2,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "black",
            },
          },
          y: {
            grid: {
              display: true,
            },
            ticks: {
              color: "black",
            },
          },
        },
        maintainAspectRatio: false,
      },
    });

    this.setState({ isLoaded: chart });
  };

  handleInput = (event) => {
    this.setState({
      companySymbol: event.target.value,
    });
  };

  handleFind = async () => {
    //coloquei um async/await
    if (this.state.companySymbol === "") {
      //alert("Please write a valid stock name");
    } else {
      await this.getChartData();
    }
  };

  ////////////////////////////SEARCH BAR BY NAME////////////////////////////////////

  getSearchData = async () => {
    const apiKey = "R2P4F9RG0EKKWZEU";

    let url2 = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.searchEndPoint}&apikey=${apiKey}`;
    console.log(url2);

    const response2 = await axios.get(url2);

    if (response2.data["bestMatches"] === undefined) {
      return null;
    }
    const matches = [...response2.data["bestMatches"]];
    this.setState({
      bestMatches: [...matches],
    });
  };

  handleInput2 = (event) => {
    this.setState({
      searchEndPoint: event.target.value,
    });
  };

  handleFind2 = async () => {
    //coloquei um async/await
    this.setState({
      displaySearchbar: !this.state.displaySearchbar,
    });

    if (this.state.searchEndPoint !== "") {
      await this.getSearchData();
    }
  };

  handleSubmitSearch = (event) => {
    this.setState({
      companySymbol: event.target.name,
      displaySearchbar: !this.state.displaySearchbar,
    });
  };

  //////////////////////////END//////////////////////////////////

  render() {
    return (
      <div className="container">
        <h1 className="title-stocks">Stock Informations</h1>
        <div className="divideTwoSections">
          <div className="container-searchByName">
            <div className="searchBar">
              <input
                id="companySymbolInput"
                className="inputText-Stocks"
                onChange={this.handleInput}
                value={this.state.companySymbol}
              />
              <button className="button-Stocks" onClick={this.handleFind}>
                Find
              </button>
            </div>
            <div className="searchBar">
              <input
                id="companySymbolInput2"
                className="inputText-Stocks"
                onChange={this.handleInput2}
                placeholder="Ticker Symbol Lookup"
              />

              <button className="button-Stocks" onClick={this.handleFind2}>
                Search name
              </button>
            </div>
            {this.state.displaySearchbar === false ||
            this.state.bestMatches.length === 0 ||
            this.state.bestMatches === undefined ? null : (
              <div className="dataResult">
                {this.state.bestMatches.map((match) => {
                  return (
                    <div key={match["1. symbol"]} className="dataItem">
                      <button
                        className="no-button-decoration "
                        name={match["1. symbol"]}
                        onClick={this.handleSubmitSearch}
                      >
                        {`${match["2. name"].split(" ")[0]} ${
                          match["2. name"].split(" ")[1]
                        }  `}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="canvasGraphic">
            <canvas id="myCanvas"> </canvas>
          </div>
        </div>
      </div>
    );
  }
}

export default StockList;
