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
    this.setState({ loading: true });
    let url =
      "https://newsapi.org/v2/top-headlines?country=br&category=business&apiKey=442e00c92b0148c7a2e35cc749651cf3";

    const response = await axios.get(url);
    let articlesArr = [...response.data["articles"]];

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
              <div key={article["url"]} className="card-body">
                <div className="card-image">
                  <img
                    className="imgNews"
                    alt={article["title"]}
                    src={article["urlToImage"]}
                  />
                </div>
                <div className="card-text">
                  <h2>{article["title"]}</h2>
                  <p>{article["description"]}</p>
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
