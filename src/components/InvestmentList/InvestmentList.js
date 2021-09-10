import React from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "./InvestmentList.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";

class InvestmentList extends React.Component {
  constructor() {
    super();
    this.state = {
      chartLabels: [],
      chartValues: [],
      initialDate: "",
      finalDate: "",
      chart: null,
      currency: "",
      minValue: 0,
      maxValue: 0,
    };
  }




  getData = async () => {
    try {
    //   // tem que ser let e não const
    // let queryStr = "";
    // let queryDateStr = "";
    // let queryCurrencyStr = ""

  
    //   if(this.state.initialDate !== "" && this.state.finalDate !== "") {
    //     queryStr = `?start=${this.state.initialDate}&end=${this.state.finalDate}`
    //     console.log(queryStr);
    //   }else {
    //     queryCurrencyStr = "?"
    //   }

    //   if(this.state.currency !== "") {
    //     queryDateStr = `&currency=${this.state.currency}`
    //   }
     
     
      const response = await axios.get(
        `https://api.coindesk.com/v1/bpi/historical/close.json`
      );
     
      const obj = { ...response.data.bpi };
     
      const chartLabelsClone = [];
      const chartValuesClone = [];

      for (let key in obj) {
        chartLabelsClone.push(key);
        chartValuesClone.push(obj[key]);
      }

      this.setState({
        chartLabels: [...chartLabelsClone],
        chartValues: [...chartValuesClone],
        minValue: Math.round(Math.min(...chartValuesClone)),
        maxValue: Math.round(Math.max(...chartValuesClone)) ,
      });
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount = async () => {
    
    await this.getData()
    this.renderChart()
  
  };


  componentDidUpdate = async (prevProps, prevState) => {
   
    if (  
      prevState.initialDate !== this.state.initialDate ||
         prevState.finalDate !== this.state.finalDate  ||
         prevState.currency !== this.state.currency ) {   
        await this.getData()   
        this.renderChart();
        
  }} 
   

  renderChart = () => {
    if (this.state.chart) {
      this.state.chart.destroy();
    }
    
    
    const chart = new Chart(document.getElementById("myCanvas"), {
      type: "line",
      data: {
        labels: this.state.chartLabels,
        datasets: [
          {
            label: "",
            data: this.state.chartValues,
            backgroundColor: "#03b1fc",
            borderColor: "black",
            fill: true,
            tension: 0.2,
            borderWidth:1
          },
        ],
      },
    });

    this.setState({ chart: chart });
  };

  handleDate = (event) => {
    this.setState({ [event.target.name]: event.target.value });

  };

  handleCurrency =(event) => {
    this.setState({currency: event.target.value})
  }
  

  render() {
  

    return (
        <div>
         
          <div  className ="graphic">
            <div>
              <input type="date" name="initialDate" onChange={this.handleDate} />
              <input type="date" name="finalDate" onChange={this.handleDate} />
              <select className="form-select w-25 mt-2" aria-label="Default select example" onChange={this.handleCurrency}>
                <option value="USD" >USD</option>
                <option value="EUR" >EUR</option>
              </select>
            </div>
            
            <div className="">
              <h1>Values</h1>
              <h3>Max Price: {this.state.maxValue} {!this.state.currency ? "USD" : this.state.currency}</h3>
              <h3>Min Price: {this.state.minValue} {!this.state.currency ? "USD" : this.state.currency}</h3>
            </div>
          </div>
          
          {/* <h1>{Math.max(...this.state.chartValues)}</h1> */}
          <canvas id="myCanvas"> </canvas>
          
        </div>
      );
    }
  }




export default InvestmentList;

