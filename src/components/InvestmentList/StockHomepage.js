import React from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "./StockHomepage.css";

import LoadingAnimation from "../loading/LoadingAnimation";

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
    console.log(response.data);

    // let articlesArr = [...response.data["articles"]]

    this.setState({
      topArticles: [articlesArr[0]],
      // topArticles: [...articlesArr],
    });
    //  console.log(this.state.topArticles.length);
    // console.log(this.state.topArticles[0]["image"]);
    console.log(url);
  };

  //////////////NEWS CARD END //////////////////

  getChartData = async () => {
    const apiKey = "R2P4F9RG0EKKWZEU";
    const random = this.getRandomStocks();

    //FUNCIONANDO
    // let url = `https://www.alphavantage.co/query?function=${
    //   this.state.typeInformation
    // }&symbol=${random}&outputsize=${
    //   this.state.outputsize
    // }&apikey=${apiKey}`;
    // console.log(url)

    // let  url2 = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${random}&apikey=${apiKey}`

    //USAR PARA NÃO ATINGIR O LIMITE DE APIS
    let url =
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo%22";

    const response = await axios.get(url);

    this.setState({
      companySymbol: random,
    });

    // const response2 = await axios.get(url2)
    // const companyInformations = {...response2.data}

    //     this.setState ({
    //       companyOverview: companyInformations
    //    })

    this.transformDataChart(response.data);
  };

  getCompanyDescription = async () => {
    const apiKey = "R2P4F9RG0EKKWZEU";
    //FUNCIONANDO LIMITE DE APIS
    // let url2 = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${this.state.companySymbol}&apikey=${apiKey}`
    //  console.log(url2)

    /// USAR QUANDO LIMITE DE APIS FOR ATINGIDO
    let url2 =
      "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo";
    console.log(url2);

    const response2 = await axios.get(url2);

    const companyInformations = { ...response2.data };
    // console.log(companyInformations)
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

  //   componentDidUpdate = (prevProps, prevState) => {
  //     if (prevState.chartValuesY !== this.state.chartValuesY) {
  //       this.renderChart();
  //     }
  //  }

  renderChart = () => {
    // if (this.state.chartValuesX.length === 0) {
    //   return alert("Couldn't find information about this stock at the moment. Please try again or serch for another");
    // }

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
            borderWidth: 2,
            pointRadius: 0,
          },
          {
            label: "low", //this.state.companySymbol.toUpperCase(),
            data: this.state.chartValuesY2,
            // backgroundColor:"black",
            borderColor: "green",
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
          },
          {
            label: "close", //this.state.companySymbol.toUpperCase(),
            data: this.state.chartValuesY3,
            backgroundColor: "black",
            borderColor: "black",
            fill: true,
            tension: 0.4,
            borderWidth: 2,
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
          },
          y: {
            grid: {
              display: true,
            },
            ticks: {
              color: "black",
              display: false,
            },
          },
        },
        maintainAspectRatio: false,
      },
    });

    this.setState({ isLoaded: chart });
  };

  render() {
    return (
      <div className="container-homepage">
        {this.state.loading ? (
          <div style={{ marginLeft: "auto", marginRight: "auto" }}>
            <LoadingAnimation />
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
                <div className="stripInformation">
                  <h2>{this.state.companyOverview["Name"]}</h2>
                </div>
                <br />
                <div className="stripInformation">
                  <b>Exchange: </b> {this.state.companyOverview["Exchange"]}{" "}
                  {this.state.companyOverview["AssetType"]}
                </div>
                <div className="stripInformation">
                  {" "}
                  <b>Sector: </b> {this.state.companyOverview["Sector"]}
                </div>
                <div className="stripInformation">
                  {" "}
                  <b>52-Week High: </b>${" "}
                  {this.state.companyOverview["52WeekHigh"]}
                </div>
                <div className="stripInformation">
                  {" "}
                  <b>52-Week Low: </b> ${" "}
                  {this.state.companyOverview["52WeekLow"]}
                </div>
                <div className="stripInformation">
                  <b>MarketCapitalization:</b> $
                  {this.state.companyOverview["MarketCapitalization"]}
                </div>
                <div className="last-div">
                  <b>EBITDA:</b> $ {this.state.companyOverview["EBITDA"]}{" "}
                </div>
              </div>
              <div className="cards-container2">
                {this.state.topArticles.map((article) => {
                  return (
                    <div key={article["id"]} className="card-body2">
                      {article["image"] === "" || article["image"] === null ? (
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
            </div>
          </div>
        )}
        <div className="container-OurCompany">
          <h1>Your Finances in One Place</h1>
          <h2>frase/ imagem</h2>
          <div className="botao">Sign me up</div>
        </div>
      </div>
    );
  }
}

export default StockHomepage;
