import React from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "./StockHomepage.css";


const randomStockList = ["AAPL", "MSFT", "FB", "GOOG", "GOOGL", "ASML", "INTC", "NFLX", "ADBE", "CSCO", "PEP",  "XOM", "C", "PFE"]                  

class StockHomepage extends React.Component {
     
    state = {

      chartValuesX: [],
      chartValuesY: [],
      chartValuesY2:[],
      chartValuesY3:[],
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
       
//FUNCIONANDO
    // let url = `https://www.alphavantage.co/query?function=${
    //   this.state.typeInformation
    // }&symbol=${random}&outputsize=${
    //   this.state.outputsize
    // }&apikey=${apiKey}`;
    // console.log(url)

    // let  url2 = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${random}&apikey=${apiKey}`

    //USAR PARA NÃO ATINGIR O LIMITE DE APIS
    let url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo%22"

    const response = await axios.get(url);
   
    this.setState({
    companySymbol: random
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
    let url2 = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo"
    console.log(url2)
  
    const response2 = await axios.get(url2);
 
    const companyInformations = {...response2.data}
    // console.log(companyInformations)
    this.setState ({
      companyOverview: companyInformations
    })

}


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
      chartY3clone.push(obj[key]["4. close"])
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
    try {
      await this.getChartData();
      
      await this.getCompanyDescription()
     
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

    const chart = new Chart(document.getElementById("myCanvas"), {
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
            borderWidth:2 ,
            pointRadius:0,
          },
          {
            label: "low", //this.state.companySymbol.toUpperCase(),
            data: this.state.chartValuesY2,
            // backgroundColor:"black",
            borderColor: "green",
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius:0,
          },
          {
            label: "close", //this.state.companySymbol.toUpperCase(),
            data: this.state.chartValuesY3,
            backgroundColor:"black",
            borderColor: "black",
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius:0,
          }

        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
               color:"black",
               count:5},
                         
            },
          y: {
            grid: {
              display: true,
            },
            ticks: {
              color:"black",
            }
            
          },
        },
      },
    });

    this.setState({ isLoaded: chart });
  };

  render() {
    // console.log(this.state.companyOverview["Name"])
    return (
       <div className = "container-infoHomepage">
                        
         <div className= "container-stockInfo">
         <div><h1>Stock of the day: {this.state.companySymbol}</h1></div>  
            <canvas className = "container-graphStockDay" id="myCanvas"> </canvas>
            <div className  =" cointainer-listInformations">
              <div>
               <div className = "stripInformation"> <b>{this.state.companyOverview["Name"]}</b></div>
               <div className = "stripInformation"><b>Exchange: </b> {this.state.companyOverview["Exchange"]}  {this.state.companyOverview["AssetType"]}</div>
               {/* <div className = "stripInformation"><b>AssetType:</b> {this.state.companyOverview["AssetType"]}</div> */}
                <div className = "stripInformation"> <b>Sector: </b> {this.state.companyOverview["Sector"]}</div>
                 <div className = "stripInformation"><b>MarketCapitalization:</b> {this.state.companyOverview["MarketCapitalization"]}</div>
                <div className = "stripInformation"><b>EBITDA:</b> ${this.state.companyOverview["EBITDA"]} </div>
            </div>
            <div className = "card-news">
              <h2>Card news</h2>
            </div>
            </div>
          </div>

          <div className ="container-SigmaInfo">
            <h1>Your Finances in One Place</h1>
            <h2 >frase/ imagem</h2>
            <div className = "botao">Sign me up</div>
          </div>
        </div>
    );
  }
}

export default StockHomepage;
