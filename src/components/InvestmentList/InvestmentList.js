import React from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "./InvestmentList.css";

class InvestmentList extends React.Component {
  constructor() {
    super();
    this.state = {
      chartValuesX: [],
      chartValuesY: [],
      companySymbol: "FB",
      outputSize: "full",
      typeInformation: "TIME_SERIES_DAILY",
      chart: null,
    };
  }

  getChartData = async () => {
    const apiKey = "R2P4F9RG0EKKWZEU";

    let url = `https://www.alphavantage.co/query?function=${this.state.typeInformation}&symbol=${this.state.companySymbol}&${this.state.outputSize}=full&apikey=${apiKey}`;

    const response = await axios.get(url);
    console.log(response.data);
    this.transformData(response.data);
  };

  transformData = (data) => {
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
    if (this.state.chart) {
      this.state.chart.destroy();
    }
    const chart = new Chart(document.getElementById("myCanvas"), {
      type: "line",
      data: {
        labels: this.state.chartValuesX,
        datasets: [
          {
            label: this.state.companySymbol,
            data: this.state.chartValuesY,
            backgroundColor: "#03b1fc",
            borderColor: "black",
            fill: true,
            tension: 0.2,
            borderWidth: 1,
          },
        ],
      },
    });

    this.setState({ chart: chart });
  };

  handleInput = (event) => {
    this.setState({
      companySymbol: event.target.value,
    });
  };

  handleFind = () => {
    if (this.state.companySymbol === "" ) {
      alert("Please write a valid stock name");
    } else {
      this.getChartData();
    }
  };

  render() {
    return (
      <div>
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

        <div className="canvasGraphic">
          <canvas id="myCanvas"> </canvas>
        </div>
      </div>
    );
  }
}

export default InvestmentList;
