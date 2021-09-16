import React from "react";
import axios from "axios";
import "./News.css";

import LoadingAnimation from "../loading/LoadingAnimation";

class News extends React.Component {
  state = {
    topArticles: [],
    loading: false,
  };

  getNewsData = async () => {
    
    let url = "https://finnhub.io/api/v1/news?category=business&token=c50ojj2ad3ic9bdldmog";

    const response = await axios.get(url);

   
    let articlesArr = [...response.data];

    this.setState({
      topArticles: [...articlesArr],
    });
    this.setState({ loading: false });
  };

  componentDidMount = async () => {
    try {
      await this.getNewsData();
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return this.state.loading ? (
      <LoadingAnimation />
    ) : (
      <div className="news-main-div">
        <h1>News of the Day</h1>

        <div className="cards-container">
          {this.state.topArticles.map((article) => {
            return (
              <div>
                <div key={article["headline"]} className="card-body">

                   <div className="card-image" >
                      <img className="imgNews" alt= {article["headline"]} src={article["image"]} />
                  </div>
                  <div className="card-text">
                    <a className = "linkNews" href= {article["url"]}><h2>{article["headline"]}</h2></a>
                    <p>{article["summary"]}</p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default News;
