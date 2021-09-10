import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

import Header from "../header/Header";
import Footer from "../footer/Footer";

class Wallet extends React.Component {
  state = {
    username: "xx",
  };

  componentDidMount = () => {
    // this.setState({ username: this.props.match.params.userName });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="center-content">
          <h1>Welcome to your wallet {this.state.username}</h1>
          {/* <h1>Welcome to your wallet</h1> */}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Wallet;
