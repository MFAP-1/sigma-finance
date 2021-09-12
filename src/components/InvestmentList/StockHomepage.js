import React from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "./StockHomepage.css";
import InvestmentSearchList from "./InvestmentSearchList";

const randomStockList = [
  "AAPL",   "MSFT",   "AMZN",   "FB",   "GOOG",   "GOOGL",   "TSLA",   "NVIDIA",
  "PYPL",   "ASML",   "INTC",   "NFLX",   "ADBE",   "CSCO",   "PEP",   "XOM",
  "C",   "PFE",   "GE",   "AIG",   "WMT"];

class StockHomepage extends React.Component {
  state = {
    chartValuesX: [],
    chartValuesY: [],
    companySymbol: "FB",
    outputsize: "compact",
    typeInformation: "TIME_SERIES_DAILY",
    isLoaded: null,
    searchEndPoint: "",
    bestMatches: [],
  };

  getRandomStocks = () => {
    let randomStocks = [];
    for (let i = 0; i < 5; i++) {
      randomStocks.push(
        randomStockList[Math.floor(Math.random() * randomStockList.length)]
      );
    }
    console.log(randomStocks);
  };

  getChartData = async () => {
    const apiKey = "R2P4F9RG0EKKWZEU";

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
      this.getRandomStocks();
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
      return alert(
        "Couldn't find information about this stock at the moment. Please try again or serch for another"
      );
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
            pointRadius: 1,
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

  render() {
    return (
       

        
          <div className="canvasGraphic">
            <canvas id="myCanvas"> </canvas>
          </div>
        
     
    );
  }
}

export default StockHomepage;
