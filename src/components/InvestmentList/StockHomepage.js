import React from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "./StockHomepage.css";


const randomStockList = ["AAPL", "MSFT", "AMZN", "FB", "GOOG", "GOOGL"]                  

class StockHomepage extends React.Component {
     
    state = {

      chartValuesX: [],
      chartValuesY: [],
      companySymbol: "",
      outputsize: "compact",
      typeInformation: "TIME_SERIES_DAILY",
      isLoaded: null,
      companyOverview:{},
    
  }

  getRandomStocks = () => {
    const m = Math.floor(Math.random()* randomStockList.length)
    return  randomStockList[m]
}

  getChartData = async () => {
    const apiKey = "R2P4F9RG0EKKWZEU";
    const random = this.getRandomStocks()
       

    let url = `https://www.alphavantage.co/query?function=${
      this.state.typeInformation
    }&symbol=${random}&outputsize=${
      this.state.outputsize
    }&apikey=${apiKey}`;
    console.log(url)

    //teste para não passar do limite de requisições
    // let url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo%22"

    const response = await axios.get(url);
   
    this.setState({
    companySymbol: random
    });

    this.transformDataChart(response.data);
  };


  getCompanyDescription = async () => {
    const apiKey = "R2P4F9RG0EKKWZEU";

  let url2 = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${this.state.companySymbol}&apikey=${apiKey}`
   console.log(url2)
    
    // let url2 = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo"
    // console.log(url2)
  
    const response2 = await axios.get(url2);
 
    const companyInformations = {...response2.data}
    console.log(companyInformations)
    this.setState ({
      companyOverview: companyInformations
    })

}




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
      
      this.getCompanyDescription()
     
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
    if (this.state.chartValuesX.length === 0) {
      return alert("Couldn't find information about this stock at the moment. Please try again or serch for another");
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

  render() {
    console.log(this.state.companyOverview["Name"])
    return (
       <div className = "container-infoHomepage">
                        
         <div className= "container-stockInfo">
         <div><h1>Stock of the day: {this.state.companySymbol}</h1></div>  
            <canvas className = "container-graphStockDay" id="myCanvas"> </canvas>
            <div className  =" cointainer-listInformations">
            <div className = "stripInformation"> <b>Name:</b> {this.state.companyOverview["Name"]}</div>
            <div className = "stripInformation"><b>Exchange: </b> {this.state.companyOverview["Exchange"]}</div>
            <div className = "stripInformation"><b>AssetType:</b> {this.state.companyOverview["AssetType"]}</div>
            <div className = "stripInformation"> <b>Sector: </b> {this.state.companyOverview["Sector"]}</div>
            <div className = "stripInformation"><b>MarketCapitalization:</b> {this.state.companyOverview["MarketCapitalization"]}</div>
            <div className = "stripInformation"><b>DividendPerShare:</b> {this.state.companyOverview["DividendPerShare"]} </div>
            </div>
          </div>

          <div className ="container-SigmaInfo">
            <h1>TESTE</h1>
          </div>
        </div>
    );
  }
}

export default StockHomepage;
