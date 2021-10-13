import React from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "./homepage.css";

import LoadingAnimationWhite from "../loading/LoadingAnimationWhite";
import formatMoney from "../../scripts/formatMoney";

const randomStockList = [
  "AAPL",
  "MSFT",
  "FB",
  "GOOG",
  "GOOGL",
  "ASML",
  "INTC",
  "NFLX",
  "ADBE",
  "CSCO",
  "PEP",
  "XOM",
  "C",
  "PFE",
];

class StockHomepage extends React.Component {
  state = {
    chartValuesX: [],
    chartValuesY: [],
    chartValuesY2: [],
    chartValuesY3: [],
    companySymbol: "",
    outputsize: "compact",
    typeInformation: "TIME_SERIES_DAILY",
    isLoaded: null,
    companyOverview: {},
    topArticles: [],
    loading: false,
  };

  getRandomStocks = () => {
    const m = Math.floor(Math.random() * randomStockList.length);
    return randomStockList[m];
  };

  /////////////////////NEWS CARD//////////////////////////
  getNewsData = async () => {
    
    let url = `https://finnhub.io/api/v1/company-news?symbol=${this.state.companySymbol}&from=2021-09-01&to=2021-09-14&token=c50ojj2ad3ic9bdldmog`;
    const response = await axios.get(url);
    let articlesArr = [...response.data];

    this.setState({
      topArticles: [articlesArr[0]],
    });
  };

  //////////////NEWS CARD END //////////////////

  getChartData = async () => {
    const apiKey = "R2P4F9RG0EKKWZEU";
    const random = this.getRandomStocks();

    //FUNCIONANDO
    let url = `https://www.alphavantage.co/query?function=${this.state.typeInformation}&symbol=${random}&outputsize=${this.state.outputsize}&apikey=${apiKey}`;

    const response = await axios.get(url);

    this.setState({
      companySymbol: random,
    });

    this.transformDataChart(response.data);
  };

  getCompanyDescription = async () => {
    const apiKey = "R2P4F9RG0EKKWZEU";

    let url2 = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${this.state.companySymbol}&apikey=${apiKey}`;

    const response2 = await axios.get(url2);

    const companyInformations = { ...response2.data };
    this.setState({
      companyOverview: companyInformations,
    });
  };

  transformDataChart = (data) => {
    const obj = { ...data["Time Series (Daily)"] };
    const chartXclone = [];
    const chartYclone = [];
    const chartY2clone = [];
    const chartY3clone = [];

    for (let key in obj) {
      chartXclone.push(key);
      chartYclone.push(obj[key]["2. high"]);
      chartY2clone.push(obj[key]["3. low"]);
      chartY3clone.push(obj[key]["4. close"]);
    }
    chartXclone.reverse();
    chartYclone.reverse();
    chartY2clone.reverse();
    chartY3clone.reverse();
    this.setState({
      chartValuesX: [...chartXclone],
      chartValuesY: [...chartYclone],
      chartValuesY2: [...chartY2clone],
      chartValuesY3: [...chartY3clone],
    });
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      await this.getChartData();

      await this.getCompanyDescription();

      await this.getNewsData();

      this.setState({ loading: false });
      this.renderChart();
    } catch (err) {
      console.error(err);
    }
  };

  renderChart = () => {
    if (this.state.isLoaded) {
      this.state.isLoaded.destroy();
    }

    const chart = new Chart(document.getElementById("myCanvas3"), {
      type: "line",

      data: {
        labels: this.state.chartValuesX,
        datasets: [
          {
            label: "high", //this.state.companySymbol.toUpperCase(),
            data: this.state.chartValuesY,
            // backgroundColor: "blue",
            borderColor: "blue",
            fill: true,
            tension: 0.4,
            borderWidth: 1.5,
            pointRadius: 0,
          },
          {
            label: "low", //this.state.companySymbol.toUpperCase(),
            data: this.state.chartValuesY2,
            // backgroundColor:"black",
            borderColor: "green",
            fill: true,
            tension: 0.4,
            borderWidth: 1.5,
            pointRadius: 0,
          },
          {
            label: "close", //this.state.companySymbol.toUpperCase(),
            data: this.state.chartValuesY3,
            backgroundColor: "black",
            borderColor: "black",
            fill: true,
            tension: 0.4,
            borderWidth: 1,
            pointRadius: 0,
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
              display: false,
            },
            title: {
              text: "Last 100 Days",
              display: true,
              color: "black",
              font: 20,
            },
          },
          y: {
            grid: {
              display: true,
            },
            ticks: {
              color: "black",
              display: true,
            },
            title: {
              text: "Price(U$)",
              display: true,
              color: "black",
              font: 20,
            },
          },
        },
        maintainAspectRatio: false,
      },
    });

    this.setState({ isLoaded: chart });
  };

  render() {
    return this.state.loading ? (
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>
        <LoadingAnimationWhite />
      </div>
    ) : (
      <div className="container-stockOfDay">
        <div className="title-stockofDay">
          <h1>Stock of the day: {this.state.companySymbol}</h1>
        </div>
        <div className="container-canvas">
          <canvas id="myCanvas3"></canvas>
        </div>

        <div className="cointainer-infoImg">
          
          <div className="container-strips">
            <div>
              <h3>{this.state.companyOverview["Name"]}</h3>
            </div>
            <div className="stripInformation">
              <span>Exchange: </span> {this.state.companyOverview["Exchange"]}{" "}
              {this.state.companyOverview["AssetType"]}
            </div>
            <div className="stripInformation">
              <span>Sector: </span> {this.state.companyOverview["Sector"]}
            </div>
            <div className="stripInformation">
              <span>52-Week High: </span>
              {formatMoney(
                Number(this.state.companyOverview["52WeekHigh"]),
                "USD"
              )}
            </div>
            <div className="stripInformation">
              <span>52-Week Low: </span>
              {formatMoney(
                Number(this.state.companyOverview["52WeekLow"]),
                "USD"
              )}
            </div>
            <div className="stripInformation">
              <span>MarketCapitalization: </span>
              {formatMoney(
                Number(this.state.companyOverview["MarketCapitalization"]),
                "USD"
              )}
            </div>
            <div className="last-div">
              <span>EBITDA: </span>
              {formatMoney(Number(this.state.companyOverview["EBITDA"]), "USD")}
            </div>
          </div>

          {this.state.topArticles === undefined ? null : (
            <div className="cards-container2">
              {this.state.topArticles.map((article) => {
                return (
                  <div key={article["id"]} className="card-body2">
                    {article["image"] === "" || article["image"] === null || article === undefined ? (
                      <div className="card-image2">
                        <img
                          className="imgNews2"
                          alt={article["related"]}
                          src={
                            "https://s.yimg.com/uu/api/res/1.2/T44Iwg7RbRrkaTIYz_liyQ--~B/aD00Njk7dz05MDA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en/zacks.com/737ffb82e07dc8bffb77e72d153c91f2"
                          }
                        />
                      </div>
                    ) : (
                      <div className="card-image2">
                        <img
                          className="imgNews2"
                          alt={article["related"]}
                          src={article["image"]}
                        />
                      </div>
                    )}
                    <div className="card-text2">
                      <h2>{article["headline"]}</h2>
                      <a rel="noopener noreferrer" href={article["url"]}>
                        Read More...
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default StockHomepage;
